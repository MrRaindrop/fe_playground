$(document).ready(function(){
  var container = $('#target');
  $('.ajaxtrigger').click(function(){
    alert('click!');
    var url = 'https://api.douban.com/v2/book/user/xingleiwuyu/collections?status=read&start=0&count=50&;' +
        'from=2009-01-01T10:00:01&to=2010-01-01T01:00:01&callback=?';
    // var url2 = 'http://www.baidu.com';
    // doAjax($(this).attr('href'));
    doAjax(url);
    return false;
  });
  function doAjax(url){
    if(url.match('^http')){
      $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
                "q=select%20*%20from%20html%20where%20url%3D%22"+
                encodeURIComponent(url)+
                "%22&format=xml'&callback=?",
        function(data){
          if(data.results[0]){
            var data = filterData(data.results[0]);
            container.html(data);
          } else {
            var errormsg = '<p>Error: could not load the page.</p>';
            container.html(errormsg);
          }
          console.log(data);
        }
      );
    } else {
      $('#target').load(url);
    }
  }
  function filterData(data){
    data = data.replace(/<?\/body[^>]*>/g,'');
    data = data.replace(/[\r|\n]+/g,'');
    data = data.replace(/<--[\S\s]*?-->/g,'');
    data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
    data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
    data = data.replace(/<script.*\/>/,'');
    return data;
  }
});

