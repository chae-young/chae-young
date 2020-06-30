	var slider = $('.autoplay');

	slider.slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  //autoplay: true,
	  autoplaySpeed: 2000,
	});

  var basicSpeed = slider.get(0).slick.options.autoplaySpeed;

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubeIframeAPIReady(name) {
	console.log('첫로드불러오기')
	if(slider.find('.slick-current iframe').length){
	    name = slider.find('.slick-current iframe').attr('id');
		player = new YT.Player(name, {
		  events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		  }
		});
	}
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) { //처음 로드시
	player.mute()//유튜브음소거 필수
	console.log('로드검열')
	slider.slick('slickPause');
	player.playVideo();
  }

  function onPlayerStateChange(event) {
	switch(event.data){
		case 1:
		console.log('시작');
		break;
		case 2:
		console.log('정지상태')
		break;
		case 0:
		console.log('끝');
		slider.slick('slickSetOption', 'autoplaySpeed', 0);
		slider.slick('slickPlay');
		break;
	}
  }

slider.on('beforeChange', function(event, slick, currentSlide) {
	if(slider.find('.slick-current iframe').length){
		player.pauseVideo();	
	}
})
slider.on('afterChange', function(event, slick, currentSlide) {
	console.log('변경후')
	slider.slick('slickSetOption', 'autoplaySpeed', basicSpeed);

	if( $(slick.$slides.get(currentSlide)).find('iframe').length ){
		onYouTubeIframeAPIReady();
		console.log(player)
	}
})
