var localList = document.querySelector("#local-list");

var localStore = [];

var APIKEY ='AIzaSyB84GbD7RpiItTnqRXSgGmgQdDJOOYUx8M';  

$(document).ready(function()
{
    if(JSON.parse(localStorage.getItem('history')))
    {
      var tempLocal = JSON.parse(localStorage.getItem('history'));

      for(const el of tempLocal)
      {
        addItemToList(el);
      }
    }
})

$("#search-bar").submit(function (event) 
{

  event.preventDefault();

  callSearch();

  addItemToList($("#search-field").val());
;
});

$("#reset-button").click(function()
{
    localStorage.removeItem('history');
    localStorage.clear();

    localStore.clear;

    while (localList.firstChild) {
        localList.removeChild(localList.firstChild);
    }

    location.reload();
})

$('#local-list').on('click', 'li button', function()
{
    $("#search-field").val($(this).text());

    callSearch();
})

function callSearch()
{
  var searchFieldVal = $("#search-field").val();

  /* var url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=how+to+make+${searchFieldVal}&key=${APIKEY}`;

  fetch(url)
  .then(function (response) 
  {
    return response.json();
  })
  .then(function(data) 
  {

    console.log(data);
    var videoID = data.items[0].id.videoId;

    $("#video").attr('src',`https://www.youtube.com/embed/${videoID}`);

  }); */

  var wikiFrame = $('#wikiframe');
  var url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch=${searchFieldVal}`;

  fetch(url)
  .then(function(response)
  {
      return response.json();
  })
  .then(function(data)
  {
      wikiFrame.attr("src", "http://en.wikipedia.org/?curid="+ data.query.search[0].pageid);
  });
}

function addItemToList(fieldValue)
{
  var li = document.createElement("li");

  var btn = document.createElement("button");

  btn.classList.add("btn");
  btn.classList.add("btn-outline-primary");
  btn.classList.add("mt-3");

  btn.textContent = fieldValue;

  li.appendChild(btn);

  localList.insertBefore(li, localList.firstChild);

  localStore.push(fieldValue);

  localStorage.setItem('history', JSON.stringify(localStore));
}

