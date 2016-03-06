var streamers = ['freecodecamp', 'storbeck', 'terakilobyte', 'habathcx','RobotCaleb','thomasballinger','noobs2ninjas','beohoff','dansgaming','crendor', 'comster404','brunofin'];

function twitchApi(type, callback, name){
  if(type === 'streams'){
    var streamerList = streamers.join(',');
    type += '?channel=' + streamerList;
  } else if(name){
    type += '/' + name;
  } else {
    return;
  }
  $.ajax({
    type:'GET',
    dataType: 'jsonp',
    url: 'https://api.twitch.tv/kraken/' + type,
    success: callback
  });
}

function buildSteamerView(stream){
  var $streamer = '<div class="streamer-row ' + (stream.offline? 'offline' : 'online') + '">';
  $streamer += '<span class="streamer-logo"><img src="' + (stream.logo || '/img/unknown.png') + '"></span>';
  if(stream.url){
    $streamer += '<a class="streamer-name" href="' + stream.url + '">' + stream.display_name + '</a>';
  } else {
    $streamer += '<span class="streamer-name">' + stream.display_name + '</span>';
  }
  $streamer += '<span class="streamer-status">'+ stream.status + '</span>';
  $streamer += '</div>';
  $('.stream-container').append($streamer);
}

function collectStreams(){
  twitchApi('streams', function(data){
    var streams = data.streams;
    findOffline(parseOffline(streams));
    streams.forEach(function(stream){
      buildSteamerView(stream.channel);
    });
  });
}

function parseOffline(streams){
  var onlineStreams = streams.map(function(stream){
    return stream.channel.name;
  });
  return streamers.filter(function(streamer){
    return onlineStreams.indexOf(streamer) < 0;
  });
}

function findOffline(offlineStreams){
  offlineStreams.forEach(function(streamer){
    twitchApi('channels', function(data){
      if(data.error){
        data = {'display_name': streamer, status: 'Account Closed', offline: true};
      } else {
        data.offline = true;
        data.status = 'Offline';
      }
      buildSteamerView(data);
    }, streamer);
  });
}

$().ready(function(){
  collectStreams();
});
