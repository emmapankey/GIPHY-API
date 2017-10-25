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

    var isStatic = true;

    var static;

    var animate;

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
            var foodItem = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                foodItem + "&api_key=AV3UsdwQLJ2J3scDVcBiFH9YuhCn32qH&limit=10";

            $.ajax({ url: queryURL, method: "GET" })

                .done(function (response) {
                    var results = response.data;
                    makeAnimated(i);


                    for (var i = 0; i < results.length; i++) {

                        var rating = results[i].rating;
                        var ratingDiv = $("<div id='ratings'>").text("Rating: " + rating);

                        var gifImage = $("<img class='images'>");
                        static = results[i].images.fixed_height_still.url;
                        gifImage.attr("src", static);
                        console.log(isStatic);

                        $("#gifs-appear-here").prepend(gifImage);
                        $("#gifs-appear-here").prepend(ratingDiv);

                        // $("img").on("click", function (response) {
                        //     isStatic = false;
                        //     console.log(isStatic);
    
                        //     var gifImage = $("<img class='images'>");
                        //     animate = results[i].images.fixed_height.url;
                        //     gifImage.attr("src", animate);
    
                        //     $("#gifs-appear-here").prepend(gifImage);
                        // })
                    }
                
                });

                function makeAnimated(passed) {
                    console.log(passed);
                $("img").on("click", function () {
                    isStatic = false;
                    console.log(isStatic);

                    var gifImage = $("<img class='images'>");
                    animate = results[i].images.fixed_height.url;
                    gifImage.attr("src", animate);

                    $("#gifs-appear-here").prepend(gifImage);
                })
                }

        });
    }

    function runQuery() {

        $("#addButton").on("click", function () {
            searchTerm = $("#userInput").val()
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=AV3UsdwQLJ2J3scDVcBiFH9YuhCn32qH&limit=10";

            var a = $("<button class='btn btn-default' id='topicButtons'>").text(searchTerm);
            a.addClass("food");
            a.attr("data-name", searchTerm);
            $("#buttons-appear-here").prepend(a);

            displayGif();
        });
    }

    renderButtons();
    displayGif();
    runQuery();

});
