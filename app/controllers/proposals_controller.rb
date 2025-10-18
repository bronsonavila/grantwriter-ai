class ProposalsController < ApplicationController
  def new
    @proposal = Proposal.new
  end

  def generate_ideas
    @ideas = IdeaGenerationService.generate_ideas

    respond_to do |format|
      format.turbo_stream
    end
  end

  def create
    tone = ab_test(:tone_of_voice, 'formal', 'passionate')
    generated_draft = DraftingService.generate_draft(proposal_params[:mission], proposal_params[:goal], tone)

    @proposal = Proposal.new(proposal_params.merge(generated_draft: generated_draft, tone: tone))

    if @proposal.save
      track_draft_generated(@proposal)
      redirect_to @proposal, notice: 'Draft was successfully generated.'
    else
      render :new
    end
  end

  def show
    @proposal = Proposal.find(params[:id])
  end

  private

  def proposal_params
    params.require(:proposal).permit(:mission, :goal)
  end

  def track_draft_generated(proposal)
    # Track event in our own database
    Event.create(name: 'draft_generated', proposal: proposal)

    # Track event in Segment
    return unless @analytics

    @analytics.track(
      user_id: session.id.to_s, # Using session ID for anonymous user tracking
      event: 'Draft Generated',
      properties: {
        proposal_id: proposal.id,
        tone_variation: proposal.tone
      }
    )
  end
end
