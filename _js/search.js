
function new_post(url, title, date, categories, preview, thumbnail) {
  var post_title = '<h1 class="post-title"><a href="' + url + '">' + title + '</a></h1>';
  var post_date = '<span class="post-date">' + date + ' ◦ </span>';
  var post_categories = '';
  $(categories).each( function(index, category) {
    post_categories += '<a class="post-category" href="/categories/' + category + '">' + category + '</a>';
    if (index < categories.length - 1) {
      post_categories += '/';
    }
  });
  post_categories = '<span class="post-categories">' + post_categories + '</span>';
  var left = '<div class="left">' + post_date + post_categories + '</div>';
  var post_comments = '<span><a class="post-comments" href="' + url + '#disqus_thread" data-disqus-identifier="' + url + '">Comment</a></span>';
  var right = '<div class="right">' + post_comments + '</div>';
  var post_meta = '<div class="post-meta">' + left + right + '</div>';
  var post_preview = '<p>' + preview + '</p>';
  var post_thumbnail = '<img class="post-image" src="/assets/img/' + thumbnail + '"/>';
  var post = '<div class="post">' + post_title + post_meta + post_preview + post_thumbnail + '</div>';
  return post;
}

function new_pagination(page, page_last, query) {
  var prev_page = page - 1,
      next_page = page + 1,
      next_link = '',
      prev_link = '';

  if (next_page <= page_last) {
    next_link = '<a class="pagination-item older" href="/search/?q=' + query + '&page=' + next_page + '">Older</a>';
  } else {
    next_link = '<span class="pagination-item older">Older</span>';
  }

  if (prev_page > 0) {
    prev_link = '<a class="pagination-item newer" href="/search/?q=' + query + '&page=' + prev_page + '">Newer</a>';
  } else {
    prev_link = '<span class="pagination-item newer">Newer</span>';
  }

  var pagination = '<div class="pagination">' + next_link + prev_link + '</div>';

  // <div class="pagination">
  //   {% if paginator.next_page %}
  //     <a class="pagination-item older" href="/page/{{paginator.next_page}}">Older</a>
  //   {% else %}
  //     <span class="pagination-item older">Older</span>
  //   {% endif %}
  //   {% if paginator.previous_page %}
  //     {% if paginator.page == 2 %}
  //       <a class="pagination-item newer" href="/">Newer</a>
  //     {% else %}
  //       <a class="pagination-item newer" href="/page/{{paginator.previous_page}}">Newer</a>
  //     {% endif %}
  //   {% else %}
  //     <span class="pagination-item newer">Newer</span>
  //   {% endif %}
  // </div>


  // var paginator_links = '<div class="pagination--links">';
  // paginator_links += paginator_square_links;
  //
  // if ( next_page <= page_last ) {
  //   paginator_links += '<div class="next--link"><a href="/search/?q='+query+'&page='+ next_page +'" class="pagination--next">Older</a></div>';
  // }
  // if ( previous_page > 0 ) {
  //   paginator_links += '<div class="prev--link"><a href="/search/?q='+query+'&page='+ previous_page +'" class="pagination--previous">Recent</a></div>';
  // }
  // paginator_links += '</div>';

  return pagination;
}



$(function() {

  var paginator = 4;

  var idx = lunr(function () {
    this.field('title', { boost: 10 });
    this.field('categories');
    this.field('tags');
    this.field('preview');
    this.ref('id');
  });

  $.getJSON( "/search_data.json", function (data) {
    var items = [];

    $(data).each(function(index, value){
      items.push( value );
    });

    items.forEach(function(item){
      idx.add( item );
    });

    var vars = getUrlVars();
    var results;

    var query = decodeURIComponent(vars.q.replace(/\+/g, ' '));
    var page = parseInt(vars.page);

    if ( query ) {
      var results_div = $('.posts');
      var pagination_div = $('.pagination');
      if (query.length < 3) {
        results = [];
      } else {
        results = idx.search(query);
      }
      display_search_results(results, results_div, query, page, pagination_div);
    }

    function display_search_results(results, results_div, query, page, pagination_div) {
      results_div.empty();

      if (results.length) {
        var ids = [], posts_min, posts_max, page_last;

        for (var item in results) {
          var ref = results[item].ref;
          ids.push(ref);
        }
        sort_asc(ids);

        // define post_min & post_max relative to the page index
        if (page) {
          posts_min = (page - 1) * paginator;
          posts_max = posts_min + (paginator - 1);
        } else {
          page = 1;
          posts_min = 0;
          posts_max = paginator - 1;
        }

        // if the user hardcode a page that dont exist them redirect to the last page
        if ( (ids.length % paginator) > 0 ) {
          page_last = Math.floor(ids.length / paginator) + 1;
        } else {
          page_last = Math.floor(ids.length / paginator);
        }
        if ( page_last < page ) parseParams(query, page_last);

        // append the result posts to the page
        $(ids).each(function(index, value) {
          if ( index >= posts_min && index <= posts_max ) {
            $(data).each(function(id, post) {
              if( value == id) {
                var result_post = new_post(post.url, post.title, post.date, post.categories, post.preview, post.thumbnail);
                results_div.append(result_post);
              }
            });
          }
        });
        var pagination = new_pagination(page, page_last, query);
        pagination_div.append(pagination);
      } else {
        var search_item;
        if (query.length < 3) {
          search_item = '<div class="post"><h1 class="post-title">To search you need to input 3 characters minimum!</h1><h2><a href="/">Return to homepage!</a></h2></div>';
        } else {
          search_item = '<div class="post"><h1 class="post-title">No results found for "' + query + '"</h1><h2><a href="/">Return to homepage!</a></h2></div>';
        }        
        results_div.append(search_item);
      }
    }
  });
});
