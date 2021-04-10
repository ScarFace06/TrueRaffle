import store from "../redux/store";
import {setComments} from "../redux/actions";

require('dotenv').config();
const yt_api = process.env.REACT_APP_YOUTUBE_API;


/**curl \
  'https://youtube.googleapis.com/youtube/v3/comments?part=snippet&parentId=HrCeEY4_c4I&key=[YOUR_API_KEY]' \
  --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
  --header 'Accept: application/json' \
  --compressed
 */

  export const youtube_parser = (url) =>{
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length===11)? match[7] : false;
}



export const get_comments = async (link, hashtag) => {
    let id = youtube_parser(link);
    var baseUrl = 'https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&order=time&maxResults=100&videoId=' + id;
    var url = baseUrl+'&key='+yt_api;
    let res = { platform: 'Youtube', Link: link, comments: [] }
    var nextPageToken = 1;
    if (id) {
            while(true){

                if (!nextPageToken)break;
                var resi = await fetch(url);
                var response = await resi.json();
                // console.log(response);

                for (var i = 0; i < response.items.length; i++) {
                    
                    if (response.items[i].snippet.topLevelComment.snippet.textOriginal.trim().toLowerCase().includes(hashtag.trim().toLowerCase())) {
                        res.comments.push({
                            user: response.items[i].snippet.topLevelComment.snippet.authorDisplayName,
                            comment: response.items[i].snippet.topLevelComment.snippet.textOriginal,
                            time: response.items[i].snippet.topLevelComment.snippet.publishedAt
                        });
                    }
                }

                nextPageToken = response.nextPageToken ? response.nextPageToken : 0;
                url = baseUrl+"&pageToken="+nextPageToken+'&key='+yt_api;

            }

        // console.log(res);
        // store.dispatch(setComments(res));
        return res;

    } else {
        alert('No valid link');
    }

}
