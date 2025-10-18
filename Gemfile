# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.3.9"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.1.0"
# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails"

# Use sqlite3 as the database for Active Record
gem 'sqlite3', '~> 1.4', group: [:development, :test]
gem 'pg', '~> 1.5', group: :production
gem 'mutex_m'
gem "importmap-rails"
gem "tailwindcss-rails", "~> 3.3.1"
gem "cssbundling-rails"

# Use Puma as the application server
gem 'puma', '~> 5.0'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'

# Project-specific gems
gem 'gemini-ai'
gem 'dotenv-rails'
gem 'split'
gem 'redis'
gem 'analytics-ruby', '~> 2.4.0', require: 'segment/analytics'
gem 'redcarpet'

# Hotwire's Hot Reloading [https://github.com/hotwired/turbo-rails]
gem "turbo-rails"
# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "stimulus-rails"


# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop and debug your application
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.3'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem "capybara"
  gem "selenium-webdriver"
  # Easy installation and use of web drivers to run system tests with browsers
  gem "webdrivers"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :x64_mingw, :mswin]
