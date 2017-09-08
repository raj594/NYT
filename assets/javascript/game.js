function displayArticles() {

        

        // Built by LucyBot. www.lucybot.com
        var topic = $("#topicSearch").val();
        var beginYear = $("#startYear").val() + "0101";
        var endYear = $("#endYear").val() + "1231";
        console.log(topic);
        console.log(beginYear);
        console.log(endYear);

        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
          'api-key': "7691f22a659a4646b86c84e7652c96c5",
          'q': topic,
          'begin_date': beginYear,
          'end_date': endYear
        });
        $.ajax({
          url: url,
          method: 'GET',
        }).done(function(result) {
          console.log(result);
          $("#results").empty();
          var docs = result.response.docs;

          for (var i = 0; i < docs.length; i++) {
            var nextDoc = $('<div>');
            var newLink = $('<a>');
            newLink.attr('href', docs[i].web_url);
            newLink.text(docs[i].headline.main);
            nextDoc.append(newLink)
            //var p = $('<p>');
            //p.text(docs[i].snippet);
            $("#results").append(nextDoc);
          }


        }).fail(function(err) {
          throw err;
        });

      }




      
      $(document).on("click", "#search", displayArticles);

