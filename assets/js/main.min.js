function parseParams(a, b) {
  var params;
  if (b) {
    params = { q : a, page : b };
  } else {
    params = { q : a };
  }
  var str = $.param(params);
  document.location.search = str;
}

function sort_asc(array) {
  for(var i in array) {
    for(var j in array) {
      if (array[i] < array[j]) {
        var old = array[j];
        array[j] = array[i];
        array[i] = old;
      }
    }
  }
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function anchorTagLinks() {
  $("h2, h3").each(function(i, el) {
    var $el, icon, id;
    $el = $(el);
    id = $el.attr('id');
    icon = '<i class="ion-link link-icon"></i>';
    if (id) {
      $el.append(' <a class="header-link" href="#' + id + '" title="Permalink">' + icon + '</a>');
    }
  });
}

$(document).ready(function () {
  setTimeout(function() {
    var x = document.getElementsByTagName("script")[0];
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '//ruisaraiva19.disqus.com/count.js';
    s.async = true;
    s.id = 'dsq-count-scr';
    x.parentNode.insertBefore(s, x);
  }, 10);

  /*
  * img - disable right click and dragging
  */
  $("body").on("contextmenu", "img", function(e) { return false; });
  $('img').on('dragstart', function(event) { event.preventDefault(); });

  anchorTagLinks();

});
