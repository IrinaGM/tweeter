/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

/**
 * @function createTweetElement - Takes in a tweet object and returns a tweet <article> element containing the entire HTML structure of the tweet.
 * @param {object} tweet
 * @returns {html}
 */

const createTweetElement = (tweet) => {
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
};

/**
 * @function renderTweets - taking in an array of tweet objects and then appending each one to the .tweets-container
 * @param {array} tweets
 */

const renderTweets = (tweets) => {
  $(document).ready(() => {
    for (const tweet of data) {
      let $tweet = createTweetElement(tweet);
      $(".tweets-container").append($tweet);
    }
  });
};

renderTweets(data);
