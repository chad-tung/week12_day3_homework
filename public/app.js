var app = function(){
  var url = 'https://api.punkapi.com/v2/beers'

  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function() {
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  populateList(beers);
}

var populateList = function(beers) {
  var ul = document.getElementById('beer-list')
  beers.forEach(function(beer) {
    var li = document.createElement('li');
    li.innerText = beer.name;
    var img = document.createElement('img');
    img.src = beer.image_url;
    ul.appendChild(li);
    ul.appendChild(img);
  });
}

window.addEventListener('load', app);
