require('dotenv').config();
var Twit = require('twit');

var T = new Twit({
    consumer_key:         process.env.REACT_APP_TWITTER_API_KEY,
    consumer_secret:      process.env.REACT_APP_TWITTER_API_KEY_SECRET,
    app_only_auth:        true
})





export const get_retweets =  (link) => {
    T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
        console.log(data)
      })
}


