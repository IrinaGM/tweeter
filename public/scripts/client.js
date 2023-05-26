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
      <span>${timeago.format(tweet.created_at)}</span>
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
 * @function createErrorMsgElement - Takes in an error message and returns a all the children elements containing the HTML structure of an error message.
 * @param {string} errorMsg
 * @returns {html}
 */

function createErrorMsgElement(errorMsg) {
  const errorMsgMarkup = `
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p class="error-msg">${errorMsg}</p>
    <i class="fa-solid fa-triangle-exclamation"></i>
  `;
  return $(errorMsgMarkup);
}

/**
 * @function renderTweets - taking in an array of tweet objects and then appending each one to the .tweets-container
 * @param {array} tweets
 */

function renderTweets(tweets) {
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(".tweets-container").prepend($tweet);
  }
}

/**
 * @function renderError - taking in a target element and an error message and appending the error to the target element if conditions are met
 * @param {string} element - target element to which to add the error
 * @param {string} errorMsg - error message
 */

function renderError(element, errorMsg) {
  //check if element is hidden
  if ($(`${element}`).hasClass("hidden")) {
    // remove "hidden" class
    $(`${element}`).removeClass("hidden");
    // create the error message elements and add it as children to the element
    $(`${element}`).append(createErrorMsgElement(errorMsg));
  } else {
    //element is not hidden, therefore update error (in case a different error needs to be presented)
    $(`${element}`).find(".error-msg").text(`${errorMsg}`);
  }
}

/**
 * @function escape - function to escape text in order prevent cross-site scripting
 * @param {string} str - the input to escape
 * @return {string} - returns the text after it has been escaped
 */

function escape(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function () {
  // Function to fetch the tweets from "/tweets" endpoint and to display them on the page when page is loaded for the first time
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

    //validate "new-tweet-submit" form input
    const tweetText = escape($("#tweet-text").val());

    if (tweetText === "" || tweetText === null) {
      // show the error message in the appropriate element
      renderError("#error-container", "Tweet cannot be blank");
    } else if (tweetText.length > 140) {
      // show the error message in the appropriate element
      renderError("#error-container", "Tweet is too long");
    } else {
      // if all validation passed submit form
      //check if the error-container visible, and hide it if it is.
      if (!$("#error-container").hasClass("hidden")) {
        $("#error-container").addClass("hidden");
        //clear our all chilldren of error-container
        $("#error-container").empty();
      }
      // send tweet text to the server
      $.post("/tweets", { text: tweetText }).done(function (data) {
        //clear tweet-text field
        $("#tweet-text").val("");
        //clear tweets-container from child elements
        $("#tweets-container").empty();
        //load all the tweets from db
        loadTweets();
      });
    }
  });
});
