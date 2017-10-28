$(document).ready(function () {
    
        // Array of topics to use to query the Giphy API for gifs
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
 
        // Function to iterate through the topics array and create a button for each item
        function renderButtons() {
            $("#buttons-appear-here").empty();
            for (var i = 0; i < topics.length; i++) {
                var a = $("<button class='btn btn-default' id='topicButtons'>").text(topics[i]);
                a.addClass("food");
                a.attr("data-name", topics[i]);
                $("#buttons-appear-here").prepend(a);
            }
        }

        // Function with AJAX call to the Giphy API
        function displayGif() {

                var foodItem = $(this).attr("data-name");
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    foodItem + "&api_key=AV3UsdwQLJ2J3scDVcBiFH9YuhCn32qH&limit=2";
    
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).done(function (response) {
                    console.log(response);
                    var results = response.data;
    
                    for (var i = 0; i < results.length; i++) {
    
                        var staticURL = results[i].images.fixed_height_still.url;
                        var animatedURL = results[i].images.fixed_height.url;
    
                        var rating = results[i].rating;
                        var ratingP = $("<p id='ratings'>").text("Rating: " + rating);
    
                        var gifImage = $("<img id='gifs'>");
                        // static = results[i].images.fixed_height_still.url;
                        // gifImage.attr("src", static);
                        gifImage.attr("src", staticURL);
                        gifImage.attr("data-state", "still");
                        gifImage.attr("data-still", staticURL);
                        gifImage.attr("data-animate", animatedURL);
    
                        $("#gifs-appear-here").prepend(gifImage);
                        $("#gifs-appear-here").prepend(ratingP);
                
    
                    
                    }
    
                });
    
    
            // });
        }
    
    
        // Function holding the click event for the submit button which creates a button for the
        // search term input by the user and then calls the function for running the Giphy query.
        // function runQuery() {
            $("#addButton").on("click", function () {
                searchTerm = $("#userInput").val()
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=AV3UsdwQLJ2J3scDVcBiFH9YuhCn32qH&limit=10";
    
                var a = $("<button class='btn btn-default' id='topicButtons'>").text(searchTerm);
                a.addClass("food");
                a.attr("data-name", searchTerm);
                $("#buttons-appear-here").prepend(a);

                topics.push(searchTerm);

                renderButtons();
            });
    
        $(document).on("click", "#gifs", playStopGifs);

        $(document).on("click", ".food", displayGif);

    
        function playStopGifs() {
                var state = $(this).attr("data-state");
                console.log(this);
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
        
        }
    
        renderButtons();
    
    });