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
  var num = 0;
  var name;
  var done;

  function onYouTubeIframeAPIReady() {
	done = false;
	if(slider.find('.slick-current iframe').length){
		
		//var id = slider.find('.slick-current iframe').attr('id');
		//slider.find('.slick-current iframe').attr('id',id + num++);
		console.log('첫로드불러오기')

	    name = slider.find('.slick-current iframe').attr('id');
		player = new YT.Player(name, {
		  events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		  },
		})
	}
}


  // 4. The API will call this function when the video player is ready.

  function onPlayerReady(event) { //처음 로드시
	console.log('로드검열')
	player.mute()//유튜브음소거 필수
	//console.log('로드검열')
	//slider.slick('slickPause');
	event.target.playVideo();
  }

  var playerState;

  function onPlayerStateChange(event) {
	console.log('재생표시')
	switch(event.data){
		case 1:
		console.log(player,'재생');
		break;

		case 2:
		console.log(player,'정지상태')
			//player.playVideo();
		break;

		case 0:
		break;
		slider.slick('slickPlay');
	}
	playerState = event.data;
	done = true;

  }



slider.on('beforeChange', function(event, slick, currentSlide) {
	console.log('슬릭비포')
	//if( $(slick.$slides.get(currentSlide)).find('iframe').length ){
		if(playerState == 1){
			player.pauseVideo();
		}

	//}	
})
slider.on('afterChange', function(event, slick, currentSlide) {
	console.log('슬릭애프터')
	if( $(slick.$slides.get(currentSlide)).find('iframe').length ){
		onYouTubeIframeAPIReady()
			done = true
			console.log(done)
		if(done){
			if(playerState == 2){
				console.log('222')
				player.playVideo();
			}
		}
	}	
})
