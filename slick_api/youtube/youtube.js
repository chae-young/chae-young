  var slider = $('.autoplay');

   slider.slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 2000,
   });
	


  var basicSpeed = slider.get(0).slick.options.autoplaySpeed;

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  var n = 0;
  var playerOB = {};



function onYouTubeIframeAPIReady() {

	if(slider.find('.slick-current iframe').length){
		
		//var id = slider.find('.slick-current iframe').attr('id');
		//slider.find('.slick-current iframe').attr('id',id + num++);
		//console.log('첫로드불러오기')
		console.log(playerOB)
	    name = slider.find('.slick-current iframe').attr('id');
		player = new YT.Player(name, {
		  events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange
		  },
		})
	}

}


  // 4. The API will call this function when the video player is ready.
var et 
function onPlayerReady(event) { //처음 로드시
	//console.log(event.target.getVideoData())
	et = event.target;
	//console.log('로드검열')
	playerOB[$(player.h).attr('id')] = 1;
	player.mute()//유튜브음소거 필수

	slider.slick('slickPause');
	event.target.playVideo();
	//playerOB.name+n = '1';
}

var playerState;

function onPlayerStateChange(event) {
	//console.log('재생상태',event.data,event.target)
	switch(event.data){
		case 1:
		//console.log('재생표시','재생');
			slider.slick('slickPause');
		break;

		case 2:
		//console.log('재생표시','정지상태')
			slider.slick('slickPause');
		break;

		case 0:
			slider.slick('slickSetOption', 'autoplaySpeed', 0);
			slider.slick('slickPlay');
			//slider.slick('slickSetOption', 'autoplaySpeed', basicSpeed);
		break;
	}
	playerState = event.data;

}


slider.on('beforeChange', function(event, slick, currentSlide) {
	//console.log('슬릭비포')
	if( $(slick.$slides.get(currentSlide)).find('iframe').length ){
	    playerOB[$(player.h).attr('id')] = 2;
		if(playerState == 1){
			et.pauseVideo();
		}
		if(playerState == YT.PlayerState.ENDED){
			slider.slick('slickSetOption', 'autoplaySpeed', basicSpeed);
		}
	}
})
slider.on('afterChange', function(event, slick, currentSlide) {
	//console.log('슬릭애프터')
	if( $(slick.$slides.get(currentSlide)).find('iframe').length ){
		onYouTubeIframeAPIReady()
		console.log(et)
			if( playerOB[$(player.h).attr('id')] == 2 ){
					et.h = player.h;

				if(playerState == YT.PlayerState.PAUSED || playerState == YT.PlayerState.ENDED){
					et.playVideo()
					//console.log(playerState,'현재 재생상태')
				}
			}

	}else{
		console.log('슬라이더없음')
		slider.slick('slickPlay');
	}
})

//로드검열중일때는 재생되면 안됨.