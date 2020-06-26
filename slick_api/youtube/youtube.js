	var slider = $('.autoplay');

	slider.slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 2000,
	});

  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	  events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange
	  }
	});
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
	player.mute()
	player.pauseVideo()
	//event.target.playVideo();
  }

  function onPlayerStateChange(event) {
	console.log(event.data)
	if(event.data == 1){
		slider.slick('slickPause');
	}
  }
  function stopVideo() {

  }

 slider.on('beforeChange', function(event, slick, currentSlide) {
	
});
 slider.on('afterChange', function(event, slick, currentSlide) {
    player.playVideo()

});