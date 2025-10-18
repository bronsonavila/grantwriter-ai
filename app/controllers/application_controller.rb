class ApplicationController < ActionController::Base
  include Split::Helper

  before_action :initialize_analytics

  private

  def initialize_analytics
    return unless ENV['SEGMENT_WRITE_KEY'].present?

    @analytics = Segment::Analytics.new(write_key: ENV['SEGMENT_WRITE_KEY'])
  end
end
