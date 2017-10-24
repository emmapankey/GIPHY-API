$(document).ready(function () {

    var topics = [
        "Cheeseburger",
        "Pizza",
        "Bacon",
        "Doughnut",
        "Sushi",
        "Ice Cream",
        "Burrito"
    ];

    var searchTerm = "";

    function renderButtons() {
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button class='btn btn-default' id='topicButtons'>").text(topics[i]);
            a.addClass("food");
            a.attr("data-name", topics[i]);
            $("#buttons-appear-here").prepend(a);
        }
    }

    function displayGif() {

        $('.food').on("click", function () {
            console.log(this);
            var emotion = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                emotion + "&api_key=AV3UsdwQLJ2J3scDVcBiFH9YuhCn32qH&limit=10";

            $.ajax({ url: queryURL, method: "GET" })

            .done(function (response) {
                console.log(response);
                var results = response.data;


                for (var i = 0; i < results.length; i++) {

                    var static = results[i].images.fixed_height_still.url;

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var gifImage = $("<img class='images'>");
                    gifImage.attr("src", static);

                    $(gifImage).append(p);
                    $("#gifs-appear-here").append(gifImage);  
                }
            });
        });
    }


    function runQuery() {

        $("#addButton").on("click", function () {
            searchTerm = $("#userInput").val().trim();
            console.log(searchTerm);
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=AV3UsdwQLJ2J3scDVcBiFH9YuhCn32qH&limit=10";
            console.log(queryURL);

            $.ajax({ url: queryURL, method: "GET" })

            .done(function (response) {
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(gifImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
        });
    }

    renderButtons();
    displayGif();
    runQuery();
    
});
