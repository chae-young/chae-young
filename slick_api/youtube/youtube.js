	var slider = $('.autoplay');

	slider.slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 2000,
	});

  var basicSpeed = slider.get(0).slick.options.autoplaySpeed;
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
 
  function onYouTubeIframeAPIReady() {
	
	function playerSet(name){
		player = new YT.Player(name, {
		  events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		  }
		});

	}
	playerSet('player1')
	console.log('2')



	 slider.on('afterChange', function(event, slick, currentSlide) {
		console.log('변경후');
		playerSet('player2')
		slider.slick('slickSetOption', 'autoplaySpeed', basicSpeed);
	});

  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) { //처음 로드시
	player.mute()//유튜브음소거 필수
	
	console.log('3')
	  if(slider.find('.slick-current iframe').length){
		slider.slick('slickPause');
		player.playVideo();
	  }
	 slider.on('beforeChange', function(event, slick, currentSlide) {
		console.log('변경전');
		player.pauseVideo();
	 });
  }

  function onPlayerStateChange(event) {
	switch(event.data){
		case 1:
		console.log('시작');
		break;
		case 0:
		console.log('끝');
		slider.slick('slickSetOption', 'autoplaySpeed', 0);
		slider.slick('slickPlay');
		break;
	}
  }



console.log('1')