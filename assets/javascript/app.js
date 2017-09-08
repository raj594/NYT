function displayArticles() {

        var topic = $(this).attr("data-name");

        // Built by LucyBot. www.lucybot.com
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
          $("#articles-view").empty();
          var docs = result.response.docs;

          for (var i = 0; i < docs.length; i++) {
            var nextDoc = $('<div>');
            var newLink = $('<a>');
            newLink.attr('href', docs[i].web_url);
            newLink.text(docs[i].headline.main);
            nextDoc.append(newLink)
            //var p = $('<p>');
            //p.text(docs[i].snippet);
            $("#articles-view").append(nextDoc);
          }


        }).fail(function(err) {
          throw err;
        });

      }

      function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < movies.length; i++) {

          var a = $("<button>");
          a.addClass("movie");
          a.attr("data-name", movies[i]);
          a.text(movies[i]);
          $("#buttons-view").append(a);

        }
      }

      // This function handles events where a movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        movies.push(movie);


        renderButtons();
      });

      
      $(document).on("click", ".searchArticles", displayArticles);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();