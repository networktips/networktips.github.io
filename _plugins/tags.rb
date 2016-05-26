module Jekyll

  class TagPage < Page
    def initialize(site, tag, num_page)
      @site = site
      @base = site.source

      tag_dir = site.config['tag_dir'] || 'tags'
      @dir = File.join(tag_dir, tag)

      @name = Paginate::Pager.paginate_path(site, num_page)
      @name.concat '/' unless @name.end_with? '/'

      self.process(@name)

      tag_layout = site.config['tag_layout'] || 'index.html'
      self.read_yaml(@base, tag_layout)

      self.data.merge!(
        'paginator' => Paginate::Pager.new(site, num_page, site.tags[tag]),
        'title' => tag
      )
    end
  end

  class TagPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'tag_index'
        site.tags.each do |tag, posts|
          total = Paginate::Pager.calculate_pages(posts, site.config['paginate'])
          (1..total).each do |i|
            site.pages << TagPage.new(site, tag, i)
          end
        end
      end
    end
  end

end
