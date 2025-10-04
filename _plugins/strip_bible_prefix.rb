Jekyll::Hooks.register :bible, :post_init do |article|
  article.data['categories'] = File.basename(File.dirname(article.path))
  article.data['slug'] = article.basename_without_ext[3..-1]
end