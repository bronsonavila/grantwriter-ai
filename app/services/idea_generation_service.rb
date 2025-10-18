require "gemini-ai"
require "json"

class IdeaGenerationService
  def self.generate_ideas
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

    prompt = "Generate a random, creative, and plausible mission and grant goal for a fictional nonprofit organization. The mission should be a single sentence. The goal should also be a single sentence. Format your response as follows: ${MISSION}_||_${GOAL}"

    begin
      result = client.generate_content(
        {
          contents: { role: 'user', parts: { text: prompt } }
        }
      )

      # Extract and parse the text response
      response_text = result.dig("candidates", 0, "content", "parts", 0, "text")
      mission, goal = response_text.split('_||_')

      { mission: mission.strip, goal: goal.strip }

    rescue StandardError => e
      Rails.logger.error "Error generating ideas from Gemini: #{e.message}"
      { error: "Could not generate ideas. Please try again." }
    end
  end
end
