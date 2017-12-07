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
    li.innerText = `${beer.name}: ${beer.tagline}`;

    var ing = document.createElement('li');
    ing.innerText = "Ingredients:"

    var img = document.createElement('img');
    img.src = beer.image_url;

    liMalt = document.createElement('li');
    var maltString = "Malts: \n";
    for (malt of beer.ingredients.malt) {
      maltString += `${malt.name} \n`
    }
    liMalt.innerText = maltString;

    liHops = document.createElement('li');
    var hopsString = "Hops: \n";
    for (hops of beer.ingredients.hops) {
      hopsString += `${hops.name} \n`
    }
    liHops.innerText = hopsString;

    liYeast = document.createElement('li');
    var yeastString = `Yeast: \n${beer.ingredients.yeast}`;
    liYeast.innerText = yeastString;

    li.appendChild(ing);
    li.appendChild(liMalt);
    li.appendChild(liHops);
    li.appendChild(liYeast);
    ul.appendChild(li);
    ul.appendChild(img);
  });
}

window.addEventListener('load', app);
