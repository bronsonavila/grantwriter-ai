module MarkdownHelper
  def markdown_to_html(text)
    renderer = Redcarpet::Render::HTML.new(hard_wrap: true, filter_html: true)
    markdown = Redcarpet::Markdown.new(renderer, extensions = {})
    markdown.render(text).html_safe
  end
end
