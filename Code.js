
//all code write by me, except the API and regex pattern
//averyone can edit this file
//If you have any suggestions you can contact me on telegram @usernobV2

//masukkan url videomu disini
const videoUrl = 'https://youtu.be/8ob6iseqTAk'; //silahkan replace url ini dengan url video mu 
//pastikan diapit tanda petik seperti contohnya


function updateTitle() {
  //regex untuk ekstrak video id dari url
  let pattern = /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gim;
  let videoID = pattern.exec(videoUrl)[1];

  //data untuk membuat request ke Youtube API
  let part = 'snippet,statistics';
  let params = {'id': videoID};

  //membuat request keYoutube API
  let response = YouTube.Videos.list(part, params);
  let video = response.items[0];
  console.log(video);

  //video variable pilihlah yang akan ditambahkan pada title
  let videoViews = video.statistics.viewCount;
  //video views = jumlah penonton video, hasil dari variable ini berupa angka
  let videoLikes = video.statistics.likeCount; 
  //video likes = jumlah like video, hasil dari variable ini berupa angka
  let videoDislikes = video.statistics.dislikeCount;
  //video dislikes = jumlah dislike video, hasil dari variable ini berupa angka
  let videoComments = video.statistics.commentCount;
  //video comments = jumlah komen pada video, hasil dari variable ini berupa angka

  //CONTOH TITLE VIDEO
  //ganti sesuai selera
  let videoTitle = `video ini ditonton oleh ${videoViews} orang gabut` // ini title yang saya gunakan
  //contoh lainnya
  //let videoTitle = `video ini memiliki ${videoViews} views dan ${videoLikes} like`
  //pilih salah satu dari videoTitle tersebut yang tidak ingin digunakan beri tanda '//' sedangkan yang lu pilih jangan tambahin '//' didepannya
  
  //save variabel untuk digunakan lagi
  const User = PropertiesService.getUserProperties();
  let getProperty = User.getProperties()
  console.log(getProperty)
  let recentViews = getProperty.views;
  //console.log(recentViews)
  let recentLikes = getProperty.likes;
  let recentDislikes = getProperty.dislikes;
  let recentComments = getProperty.comments;
  
  if(videoViews !== recentViews || videoLikes !== recentLikes || videoDislikes !== recentDislikes || videoComments !== recentComments){
    let properties = {
      views : videoViews,
      likes : videoLikes,
      dislikes : videoDislikes,
      comments : videoComments
    }
    User.setProperties(properties)
    //disini proses update videonya
    video.snippet.title = videoTitle;
    try {
      YouTube.Videos.update(video, part);
      console.log('title updated')
    }
    catch(e){}
  }
  
}
