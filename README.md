# GrantWriter AI Assistant

A Rails 7 demo application that uses Google Gemini AI to generate grant proposal drafts. Built to showcase AI integration, A/B testing, analytics implementation, and modern frontend development with Hotwire.

## Tech Stack

- **Backend**: Ruby 3.3.9, Rails 7.1
- **Database**: SQLite (development), PostgreSQL (production)
- **AI**: Google Gemini API (`gemini-ai` gem)
- **A/B Testing**: Split gem with Redis backend
- **Analytics**: Custom Event model + Segment (`analytics-ruby` gem)
- **Frontend**: Hotwire (Turbo Streams + Stimulus), Tailwind CSS
- **Markdown**: Redcarpet gem

## Prerequisites

- Ruby 3.3.9 (managed via `rbenv`)
- Node.js and Yarn (for Tailwind CSS compilation)
- Redis (for Split A/B testing)
- Google Gemini API key
- (Optional) Segment Write Key

## Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd grantwriter_ai

# Configure bundler to skip production gems (PostgreSQL)
bundle config set --local without 'production'

# Install dependencies
bundle install
yarn install
```

### 2. Set Up Environment Variables

Create a `.env` file in the project root:

```bash
GOOGLE_API_KEY=your_gemini_api_key_here
SEGMENT_WRITE_KEY=your_segment_write_key_here  # Optional
```

### 3. Set Up the Database

```bash
bundle exec rails db:create
bundle exec rails db:migrate
```

### 4. Start Redis

```bash
redis-server
```

(Or, if installed via Homebrew: `brew services start redis`)

### 5. Start the Development Server

```bash
./bin/dev
```

This starts both the Rails server and the Tailwind CSS watcher.

The application will be available at `http://localhost:3000`.

## Usage

1. **Enter Mission and Goal**: Fill in your nonprofit's mission and grant goal, or click the idea generation button to have the AI generate sample data.
2. **Generate Draft**: Click "Generate Draft" to create a Statement of Need. You'll be randomly assigned to either the "formal" or "passionate" tone variation (A/B test).
3. **Copy Draft**: Click "Copy to Clipboard" to copy the generated text.
4. **Reset Session**: Click "Reset Session & Retry A/B Test" at the bottom of the page to clear your session and get a new A/B test variation.

## Project Structure

```
app/
├── controllers/
│   ├── events_controller.rb        # Analytics event tracking
│   ├── proposals_controller.rb     # Main CRUD + A/B test logic
│   └── sessions_controller.rb      # Session reset for A/B testing
├── javascript/
│   ├── controllers/
│   │   ├── clipboard_controller.js          # Copy to clipboard
│   │   ├── form_submission_controller.js    # Form validation & loading states
│   │   ├── idea_button_controller.js        # Idea generation button loading state
│   │   └── toast_controller.js              # Toast notification auto-dismiss
│   └── turbo_stream_actions.js     # Custom Turbo Stream actions
├── models/
│   ├── event.rb                    # Stores analytics events
│   └── proposal.rb                 # Stores generated drafts
├── services/
│   ├── drafting_service.rb         # Gemini API integration for drafts
│   └── idea_generation_service.rb  # Gemini API integration for ideas
└── views/
    ├── proposals/
    │   ├── generate_ideas.turbo_stream.erb  # Turbo Stream for idea generation
    │   ├── new.html.erb                     # Main form
    │   └── show.html.erb                    # Generated draft display
    └── shared/
        └── _toast.html.erb         # Toast notification partial
```
