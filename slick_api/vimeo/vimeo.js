		
		/*
		slick 슬라이더에서 비메오 영상이 여러개일경우 영상이 다 끝나면 슬라이더가 자동으로 넘어감, 영상플레이중 슬라이더 넘길시 영상은 정지.
		*/
		var slider = $('#mainSlideBox');

		slider.slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: true,
		  dots: true,
		  autoplay: true,
		  autoplaySpeed: 2000,
		  adaptiveHeight: true,
			 responsive: [
				{
				  breakpoint: 767,
				  settings: {
					arrows:false
				  }
				}
			]
		})

		$('.video.slick-cloned').remove();

		var src,start,end,num,currentIframe,player;
		var Iframe = slider.find('iframe');
		
		for(var i = 0;i < slider.find('iframe').length;i++){
			(function allRemove(j){
				//src 오류로 다시 재할당
				src = $(Iframe[j]).attr('src'),
				start = src.indexOf("o/") + 1,
				end = src.indexOf("?", start+1),
				num = src.substring(start+1, end);
				
				$(Iframe[j]).attr('src','https://player.vimeo.com/video/' + num + '?autoplay=0&api=1&player_id=player1&title=0&byline=0&portrait=0&loop=0&playsinline=1');
				player = new Vimeo.Player($(Iframe[j]));

			})(i)
		}
	
		function playerSet(status,play,slick,currentSlide){
			var elt = status ? slick.$slides.get(currentSlide) : null;
			var turn = status ? $(elt).find('iframe').length : $('.main_slider .slick-current').find('iframe').length;
			if(turn){
				play ? slider.slick('slickPause') : null;
				var currentIframe =  status ? $(elt).find('iframe') : $('.main_slider .slick-current').find('iframe');
				 
				player = new Vimeo.Player($(currentIframe));
				play ? player.play() : player.pause();
				if(play){
					player.on('timeupdate',function(time){
						var autoplayTime = slider.get(0).slick.options.autoplaySpeed / 1000
						if(Math.floor(time.seconds) == (Math.floor(time.duration) - autoplayTime)){
							slider.slick('slickPlay');
						}
					})
				}
			}
		}
		playerSet(false,true);
		slider.on("beforeChange", function(event, slick, currentSlide) {
			playerSet(true,false,slick,currentSlide);
		})
		slider.on("afterChange", function(event, slick, currentSlide) {
			playerSet(true,true,slick,currentSlide);
		})

		//처음로드시
		/*if($('.main_slider .slick-current').find('iframe').length){
			slider.slick('slickPause');
			currentIframe =  $('.main_slider .slick-current').find('iframe');
			player = new Vimeo.Player($(currentIframe));

			player.play();

			player.on('timeupdate',function(time){
				if(Math.floor(time.seconds) == (Math.floor(time.duration) - 2)){//<-2는 오토플레이 시간
					slider.slick('slickPlay');
				}
			})
		}
		slider.on("beforeChange", function(event, slick, currentSlide) {
			var elt = slick.$slides.get(currentSlide);
			if($(elt).find('iframe').length){
				currentIframe =  $(elt).find('iframe');
				player = new Vimeo.Player($(currentIframe));

				player.pause();
			}
		})
		slider.on("afterChange", function(event, slick, currentSlide) {
			var elt = slick.$slides.get(currentSlide);

			if($(elt).find('iframe').length){
				slider.slick('slickPause');
				currentIframe =  $(elt).find('iframe');
				player = new Vimeo.Player($(currentIframe));

				player.play();

				player.on('timeupdate',function(time){
					if(Math.floor(time.seconds) == (Math.floor(time.duration) - 2)){//<-2는 오토플레이 시간
						slider.slick('slickPlay');
					}
				})
			}
		});*/
