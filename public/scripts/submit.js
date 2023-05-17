/**
 * * Handles the submit functionality for new tweet
 */

$(document).ready(function () {
  //add event listener for tweet submission
  $("#new-tweet-submit").on("submit", function (event) {
    //prevent default behavior of the submit event in a form
    event.preventDefault();
    // serialize the data and send it to the server
    $.post("/tweets", $(this).serialize()).done(function (data) {
      console.log("Success: ", data);
    });
  });
});
