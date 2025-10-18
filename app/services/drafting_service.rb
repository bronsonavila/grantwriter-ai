require "gemini-ai"

class DraftingService
  def self.generate_draft(mission, goal, tone)
    client = Gemini.new(
      credentials: {
        service: 'generative-language-api',
        api_key: ENV['GOOGLE_API_KEY']
      },
      options: {
        model: 'gemini-2.5-flash',
        server_sent_events: true
      }
    )

    prompt = create_prompt(mission, goal, tone)

    result = client.generate_content({
      contents: {
        role: 'user',
        parts: { text: prompt }
      }
    })

    result.dig("candidates", 0, "content", "parts", 0, "text")
  rescue StandardError => e
    Rails.logger.error "Error generating draft from Gemini: #{e.message}"
    "We're sorry, but we could not generate a draft at this time. Please try again later."
  end

  private

  def self.create_prompt(mission, goal, tone)
    if tone == "passionate"
"Act as a passionate and persuasive grant writer for a nonprofit with the mission: '#{mission}'. We are seeking a grant to '#{goal}'. Your task is to write a compelling 'Statement of Need' of approximately 300 words that moves the reader to act.

Your response must be structured to tell a powerful story:
1.  **Start with a Hook:** Open with a powerful statement or a brief, impactful anecdote that immediately grabs the reader’s attention and introduces the problem.
2.  **Broaden the Scope:** Zoom out to explain the scale and significance of the problem. Use compelling statistics and data (cite at least two different points) to show this is a widespread, critical issue in our community.
3.  **Explain the Urgency:** Clearly describe the negative consequences. What happens to our community, our clients, and our mission if this problem is not addressed right now? Create a sense of urgency.
4.  **Bridge to the Solution:** Conclude by clearly stating how the problem you've detailed creates a direct and pressing need for our project's goal, positioning it as the vital and logical next step."
    else # Default to "formal"
"As a professional grant writer for a non-profit organization whose mission is '#{mission}', please draft a formal, evidence-based 'Statement of Need' of approximately 300 words. Our objective for this grant is to '#{goal}'.

The draft must be logically structured and contain the following components:
1.  **Problem Statement:** Begin with a clear and definitive statement of the problem, its scope, and the specific target population it adversely affects.
2.  **Supporting Evidence:** Substantiate the problem with credible, quantitative data. Incorporate at least two distinct statistics from authoritative sources (e.g., government reports, community needs assessments, academic studies) to demonstrate the problem's severity and relevance.
3.  **Analysis of Causes and Consequences:** Briefly analyze the primary root causes of the problem. Following this, logically outline the broader, negative implications for the community if the issue remains unaddressed, highlighting any existing gaps in services.
4.  **Concluding Link to the Project:** Conclude by directly and professionally linking the evidence-based need to our proposed goal, positioning our project as a necessary, strategic, and effective intervention."
    end
  end
end
