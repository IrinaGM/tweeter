/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * @function createTweetElement - Takes in a tweet object and returns a tweet <article> element containing the entire HTML structure of the tweet.
 * @param {object} tweet
 * @returns {html}
 */

function createTweetElement(tweet) {
  const tweetMarkup = `
  <article>
    <header class="tweet">
        <div class="tweet-user">
          <img class="user-icon" src=${tweet.user.avatars} />
          <span>${tweet.user.name}</span>
        </div>
          <span class="user-handle">${tweet.user.handle}</span>
    </header>
    <p class="tweet-body">${tweet.content.text}</p>
    <footer class="tweet">
      <span>${tweet.created_at}</span>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-sharp fa-solid fa-heart"></i>
        </div>
    </footer>
  </article>`;
  return $(tweetMarkup);
}

/**
 * @function renderTweets - taking in an array of tweet objects and then appending each one to the .tweets-container
 * @param {array} tweets
 */

function renderTweets(tweets) {
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(".tweets-container").append($tweet);
  }
}

$(document).ready(function () {
  // Function to fetch the tweets from "/tweets" endpoint and to display them on the page
  function loadTweets() {
    $.get("/tweets").done(function (data) {
      renderTweets(data);
    });
  }

  loadTweets();

  /* ----- Event Listeners ----- */

  // Handles the submit functionality for new tweet
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
