function new_post(a,e,s,t,i,n){var r='<h1 class="post-title"><a href="'+a+'">'+e+"</a></h1>",o='<span class="post-date">'+s+" ◦ </span>",p="";$(t).each(function(a,e){p+='<a class="post-category" href="/categories/'+e+'">'+e+"</a>",a<t.length-1&&(p+="/")}),p='<span class="post-categories">'+p+"</span>";var c='<div class="left">'+o+p+"</div>",h='<span><a class="post-comments" href="'+a+'#disqus_thread" data-disqus-identifier="'+a+'">Comment</a></span>',l='<div class="right">'+h+"</div>",d='<div class="post-meta">'+c+l+"</div>",f="<p>"+i+"</p>",g='<img class="post-image" src="/assets/img/'+n+'"/>',v='<div class="post">'+r+d+f+g+"</div>";return v}function new_pagination(a,e,s){var t=a-1,i=a+1,n="",r="";n=e>=i?'<a class="pagination-item older" href="/search/?q='+s+"&page="+i+'">Older</a>':'<span class="pagination-item older">Older</span>',r=t>0?'<a class="pagination-item newer" href="/search/?q='+s+"&page="+t+'">Newer</a>':'<span class="pagination-item newer">Newer</span>';var o='<div class="pagination">'+n+r+"</div>";return o}$(function(){var a=4,e=lunr(function(){this.field("title",{boost:10}),this.field("categories"),this.field("tags"),this.field("preview"),this.ref("id")});$.getJSON("/search_data.json",function(s){function t(e,t,i,n,r){if(t.empty(),e.length){var o,p,c,h=[];for(var l in e){var d=e[l].ref;h.push(d)}sort_asc(h),n?(o=(n-1)*a,p=o+(a-1)):(n=1,o=0,p=a-1),c=h.length%a>0?Math.floor(h.length/a)+1:Math.floor(h.length/a),n>c&&parseParams(i,c),$(h).each(function(a,e){a>=o&&p>=a&&$(s).each(function(a,s){if(e==a){var i=new_post(s.url,s.title,s.date,s.categories,s.preview,s.thumbnail);t.append(i)}})});var f=new_pagination(n,c,i);r.append(f)}else{var g;g=i.length<3?'<div class="post"><h1 class="post-title">To search you need to input 3 characters minimum!</h1><h2><a href="/">Return to homepage!</a></h2></div>':'<div class="post"><h1 class="post-title">No results found for "'+i+'"</h1><h2><a href="/">Return to homepage!</a></h2></div>',t.append(g)}}var i=[];$(s).each(function(a,e){i.push(e)}),i.forEach(function(a){e.add(a)});var n,r=getUrlVars(),o=decodeURIComponent(r.q.replace(/\+/g," ")),p=parseInt(r.page);if(o){var c=$(".posts"),h=$(".pagination");n=o.length<3?[]:e.search(o),t(n,c,o,p,h)}})});