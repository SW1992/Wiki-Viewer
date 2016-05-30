 $(document).ready(function() {
   startMeUp();
 });

 function validateSearch() {

   $("#search").click(function() {
     /* if user clicked search, do this */
     $(".search-result-container").html("");
     /* scrub previous search result, if one been made */
     wikiData()
   });

   $("#search-box").keypress(function(event) {
     if (event.which == 13) {
       // if user pressed enter, do this
       $(".search-result-container").html("");
       wikiData();
     }
   });
 }

 function wikiData() {
   var searchText = $("#search-box").val()
   /* get string text entered in search box */
   var customURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&list=search&srsearch=" + searchText;
   /* creates URL for wikimedia API call */
   $.ajax({
     url: customURL,
     dataType: "jsonp",
     /* jsonp format allows cross domain request */
     type: 'GET',
     headers: {
       'Api-User-Agent': 'WikiViewer/1.0 (SamWhitman@Hotmail.co.uk)'
     },
     success: function(data) {
       var searchArray = data.query.search;
       // stores returned search object array
       for (obj = 0; obj < searchArray.length; obj ++) {
        var searchObject = searchArray[obj];
         for (prop in searchObject) {
         /* for/for in loop to loop through data 
         &  append search info to search-result-container */
            if (prop === "title") {
              var title = searchObject[prop];
              var wikiURL = "https://en.wikipedia.org/wiki/" + title.replace(/\s/g,"_");
              /* Regex to make wiki URL valid */
              $(".search-result-container").append("<a>")
              $(".search-result-container a").last().append("<div>");
              $(".search-result-container div").last().append("<h3>"+title+"</h3>");
            }
           else if (prop === "snippet") {
             var snippet = searchObject[prop];
             $(".search-result-container div").last().append("<p>"+snippet+"</p>");
             $(".search-result-container a").append("</div></a>")
             $(".search-result-container a").last().attr({href:wikiURL,target: "_blank"}) 
             /* gives search results links which will open from codepen */
          }
        }
       }
     },
     error: function(xhr, status, error) {
       if (status === "timeout") {
         alert(xhr.status + ": " + error);
       } else if (status === "error") {
         alert(xhr.status + ": " + error);
       } else if (status === "abort") {
         alert(xhr.status + ": " + error);
       } else if (status === "parsererror") {
         alert(xhr.status + ": " + error);
       } else {
         alert(xhr.status + ": " + error);
       } 
     }
   })
 }

 function startMeUp() {
   validateSearch();
 }