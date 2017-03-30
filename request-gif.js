$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();
    var validornot = $("#valid").val().toLowerCase();

    if (validornot == 5 || validornot == "five") {
        $("#notvaild").hide();
        $("#valid").removeClass("error");
        // get the user's input text from the DOM
        // TODO should be e.g. "dance"
        var searchQuery = $("#userinput").val();
        // configure a few parameters to attach to our request
        var params = {
            api_key: "dc6zaTOxFJmzC",
            tag: searchQuery + " jackson 5",
            // timeout: 400000,
            // TODO should be e.g. "jackson 5 dance"
        };

        // make an ajax request for a random GIF
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/random", // TODO where should this request be sent?
            data: params,
            // async: true,

            // attach those extra parameters onto the request
            success: function(response) {
                // if the response comes back successfully, the code in here will execute.

                // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
                $("#gif").attr("src", response.data.image_url).show();
                setGifLoadedStatus(true);
                // TODO
                // 1. set the source attribute of our image to the image_url of the GIF
                // 2. hide the feedback message and display the image
            },
            error: function() {
                // if something went wrong, the code in here will execute instead of the success function

                // give the user an error message
                $("#feedback").text("Sorry, could not load GIF. Try again!");
                setGifLoadedStatus(false);
            }
        });
        $("#loading").text("Loading . . .");
        setGifLoadedStatus(false);
        // TODO
        // give the user a "Loading..." message while they wait
    } else {
        // $("#loading").hide();
        $("#gif").hide();
        $("#notvaild").text("No gifs for you BWAHAHA!").show();
        $("#valid").addClass("error");
        setGifLoadedStatus(true);

    };


}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
    $("#loading").attr("hidden", isCurrentlyLoaded);
    $("#notvaild").attr("hidden", isCurrentlyLoaded);
}
