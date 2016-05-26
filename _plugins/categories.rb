module Jekyll

  class CategoryPage < Page
    def initialize(site, category, num_page)
      @site = site
      @base = site.source

      category_dir = site.config['category_dir'] || 'categories'
      @dir = File.join(category_dir, category)

      @name = Paginate::Pager.paginate_path(site, num_page)
      @name.concat '/' unless @name.end_with? '/'

      self.process(@name)

      category_layout = site.config['category_layout'] || 'index.html'
      self.read_yaml(@base, category_layout)

      self.data.merge!(
        'paginator' => Paginate::Pager.new(site, num_page, site.categories[category]),
        'title' => category
      )
    end
  end

  class CategoryPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'category_index'
        site.categories.each do |category, posts|
          total = Paginate::Pager.calculate_pages(posts, site.config['paginate'])
          (1..total).each do |i|
            site.pages << CategoryPage.new(site, category, i)
          end
        end
      end
    end
  end

end
