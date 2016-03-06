var queryCache = {}; //be kind

function searchResults(results){
  var query = results[0];
  var titles = results[1];
  var snippets = results[2];
  var links = results[3];
  queryCache[query] = results;

  var $results = $();
  var $noResults = $('<div class="search-result disabled"><h2>Sorry</h2><p>That search didn\'t turn up any results.</p></div>');
  if(!titles.length){
    $('#search-results').html($noResults);
    return;
  }
  titles.forEach(function(title, idx){
    var snippet = snippets[idx];
    var link = links[idx];
    var $result = $('<div href="' + link +
      '" class="search-result"><h2>' +
      title + '</h2><p>' + snippet +
      '</p></div>');
    if(!title || !link || !snippet){ $result = '';}
    $results = $results.add($result);
  });
  $('#search-results').html($results);
}

function wikiSearch(query){
  if(!query){return;}
  if(queryCache[query]){
    searchResults(queryCache[query]);
    return;
  }
  var wikiQuery = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
  $.ajax({
    type:'GET',
    dataType: 'jsonp',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    url: wikiQuery + query,
    success: searchResults
  });
}

$('button').click(function(e){
  e.preventDefault();
  var search = $('input').val();
  wikiSearch(search);
});

$('#search-results').on('click', '.search-result', function(){
  var url = $(this).attr('href');
  if(!url){ return; }
  window.open(url, '_blank');
})
