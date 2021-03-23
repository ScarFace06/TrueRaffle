require('dotenv').config();
const yt_api = process.env.REACT_APP_YOUTUBE_API;


/**curl \
  'https://youtube.googleapis.com/youtube/v3/comments?part=snippet&parentId=HrCeEY4_c4I&key=[YOUR_API_KEY]' \
  --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
  --header 'Accept: application/json' \
  --compressed
 */

  const youtube_parser = (url) =>{
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length===11)? match[7] : false;
}
    
export const  execute = (link) => {
    let id = youtube_parser(link);
    let res = { platform : 'Youtube', Link: link , comments:[] }
    if (id){
        fetch( 'https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=200&videoId='+id+'&key='+yt_api)
    .then( response => response.json() )
    .then( response => {
        // TODO make response conform { platform : "" , link: "", comments:[ { user : "", comment: " ", time: "" }]} and set next request if nextpageToken is there
        
        for ( var i = 0; i<response.items.length; i++){

            res.comments.push({
                user : response.items.[i].snippet.topLevelComment.snippet.authorDisplayName,
                comment: response.items.[i].snippet.topLevelComment.snippet.textOriginal,
                ChannelID: response.items.[i].snippet.topLevelComment.snippet.authorChannelId.value,
                time: response.items.[i].snippet.topLevelComment.snippet.publishedAt
            });
            
        }
        /*
          0:
etag: "312A-hA8bNG37EooZIdJTEl8QgM"
id: "Ugznddhlszj0kbLzlG94AaABAg"
kind: "youtube#commentThread"
snippet:
    canReply: true
    isPublic: true
    topLevelComment:
        etag: "StkoZKO-qJxomfJVrMBReRrdrY0"
        id: "Ugznddhlszj0kbLzlG94AaABAg"
        kind: "youtube#comment"
            snippet:
            authorChannelId: {value: "UC6PgUmtSAcFMgNY-DI0PgRQ"}
            authorChannelUrl: "http://www.youtube.com/channel/UC6PgUmtSAcFMgNY-DI0PgRQ"
            authorDisplayName: "Beatz Era"
            authorProfileImageUrl: "https://yt3.ggpht.com/ytc/AAUvwnj2nMRtpWGRhvzRXmTslytv0W2Vlz6mbkVD6-KRuw=s48-c-k-c0xffffffff-no-rj-mo"
            canRate: true
            likeCount: 547
            publishedAt: "2017-09-23T18:31:44Z"
            textDisplay: "<b><a href="http://www.youtube.com/results?search_query=%23BEATZGANG">#BEATZGANG</a></b><b> FIRE 🔥 or 💔 NOT ?</b>"
            textOriginal: "*#BEATZGANG** FIRE 🔥 or 💔 NOT ?*"
            updatedAt: "2017-09-23T18:31:44Z"
            videoId: "7u90uOayLTM"
            viewerRating: "none"
            __proto__: Object
            __proto__: Object
            totalReplyCount: 70
            videoId: "7u90uOayLTM"
            __proto__: Object
            __proto__: Object
            */

        console.log(res);
    } );
    } else{
        alert('No valid id');
    }
    

}




