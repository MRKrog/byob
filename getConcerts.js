var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false });
var fs = require('fs');

nightmare
  .goto('https://www.redrocksonline.com/events/category/Concerts')
  .wait('#eventsList')
  .evaluate(function () {

    let testObj = {}
    testObj.band = document.querySelector('.entry h3').innerText;
    testObj.date = document.querySelector('.m-date__singleDate').innerText;
    testObj.doors = document.querySelector('.m-doors').innerText;

    return testObj
    // var concertTitles = document.querySelectorAll('.entry')
    // var list = [].slice.call(concertTitles);
    // return list.map(function(node){
    //   console.log(node);
    //   return node.innerText
    // });
    // var title = document.querySelector('#list > .entry h3')
    // return title.innerText
    // var players = document.querySelector('.Table2__tbody .Table2__tr--lg .Table2__td--headshot img');
    // console.log(players);
    // return players.src
    // var list = [].slice.call(players);
    // return list.map(function(node){
    //   return node
    //   // let playerName = node.querySelector('td.Table2__td:nth-of-type(2) a')
    //   // return playerName.innerText
    // });
  })
  .end()
  .then(function (result) {
    fs.writeFileSync('testOutput.json', JSON.stringify(result));
    console.log('Done!', result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
