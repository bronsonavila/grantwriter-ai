class EventsController < ApplicationController
  def create
    proposal = Proposal.find(params[:proposal_id])
    @event = Event.new(name: event_params[:name], proposal: proposal)

    if @event.save
      track_in_segment(@event)
      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def event_params
    params.require(:event).permit(:name)
  end

  def track_in_segment(event)
    return unless @analytics
    @analytics.track(
      user_id: session.id.to_s,
      event: event.name.titleize, # e.g., "Draft Copied"
      properties: {
        proposal_id: event.proposal_id,
        tone_variation: event.proposal.tone
      }
    )
  end
end
