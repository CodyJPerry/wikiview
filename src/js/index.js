//Api docs link
//https://www.mediawiki.org/wiki/API:Query#Sample_query

//sample api GET request link https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json

//fetch request
//link + searchTerm
let wikiLink = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch=`;
let searchTerm = document.getElementById('searchField')
let output = document.getElementById('output');
let $outputButton = $('button');
//create new header and set it for request

//capitalize first letter of result 
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//output button
$outputButton.on('click', function (e) {
  //request to MediaWiki
  let url = wikiLink + searchTerm.value;
  //fetch data from MediaWiki
  fetch(url)
    .then(resp => resp.json())
    .then(function (data) {
      let html='';
      let activeLink = 'https://en.wikipedia.org/wiki/';
      //map over items and build out content
      data.query.search.map(function (item) {
        html += `<section class='output-card'>
                  <a href='${activeLink}${item.title}' target='_blank'>
                    <h4>${item.title}</h4>
                    <p>${capitalizeFirstLetter(item.snippet)}.</p>
                  </a>
                  </section>`;
        output.innerHTML = html;
      });
    });
  });

//enter keycode = 13
document.addEventListener('keydown', function (event) {
  //check if 'Enter' key was pressed
  if (event.keyCode === 13) {
    //request to MediaWiki
    let url = wikiLink + searchTerm.value;
    //fetch data from MediaWiki
    fetch(url)
    .then(resp => resp.json())
    .then(function (data) {
      let html='';
      let activeLink = 'https://en.wikipedia.org/wiki/';
      //map over items and build out content
      data.query.search.map(function (item) {
        html += `<section class='output-card'>
                  <a href='${activeLink}${item.title}' target='_blank'>
                    <h4>${item.title}</h4>
                    <p>${capitalizeFirstLetter(item.snippet)}.</p>
                  </a>
                  </section>`;
        output.innerHTML = html;
      });
    });
  }
});