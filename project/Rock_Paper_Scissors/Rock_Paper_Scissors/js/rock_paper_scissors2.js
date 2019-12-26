//효과

function introEffect() {
	document.querySelector('.intro .title').classList.add('blink');
	setTimeout(function(){
		document.querySelector('.radio-area').classList.add('active');
		document.querySelector('.intro .title').classList.remove('blink');
	},3300)
}
introEffect();


var computer = document.getElementById('computer');
var me = document.getElementById('me');

var rps = ['images/noun_rock.png','images/noun_paper.png','images/noun_scissors.png']

var radio = document.querySelectorAll('input');
var round = 0;


var computerImg = 0;
var meImg = 1;
var interval;
function computerInterval(){
	interval = setInterval(function(){
		if(computerImg == 0){
			computerImg = 1;
		}else if(computerImg == 1){
			computerImg = 2;
		}else{
			computerImg = 0;
		}
		computer.innerHTML = "<img src='" + rps[computerImg] + "' alt=''>";	
	},200)
}

var interval2;
function meInterval(){
	interval2 = setInterval(function(){
		if(meImg == 0){
			meImg = 1;
		}else if(meImg == 1){
			meImg = 2;
		}else{
			meImg = 0;
		}
		me.innerHTML = "<img src='" + rps[meImg] + "' alt=''>";	
	},200)
}

//var radioArea = document.querySelector('.radio-area').classList.add('active')

radio.forEach(function(el){
	el.addEventListener('change',function(){
		el.checked = true;
		round = el.value;
		console.log('라운드 : ' ,round)
		
		setTimeout(function(){
			document.querySelector('.rps-area').classList.add('active');
			document.querySelector('.radio-area').classList.remove('active');
			
		},800)

		//var radioArea = document.querySelector('.rps-area').classList.add('active')
		computerInterval()
		meInterval()

		var computerTxt = document.getElementById('computerNowScore');
		var myTxt = document.getElementById('myNowScore');
		var computerNowScore = 0;
		var myNowScore = 0;
		var btn = document.querySelectorAll('.btn');
		btn.forEach(function(btn,idx){
			btn.addEventListener('click',function(){
				me.innerHTML = "<img src='" + rps[idx] + "' alt=''>";	
				clearInterval(interval)
				clearInterval(interval2)
				round--

				var score = idx - computerImg;
				//console.log(btn,'라운드',round,'컴퓨터점수',computerNowScore, '나의점수',myNowScore,'현재점수차',score);
				if(score == 0){
					console.log('비겼어요')
				}else if([-1,2].includes(score)){
					console.log('졌어요')			
					computerNowScore = computerNowScore + 1;
					computerTxt.textContent = computerNowScore;				
				}else{
					console.log('이겼어요')		
					myNowScore = myNowScore + 1;
					myTxt.textContent = myNowScore;				
				}
				setTimeout(function(){
					computerInterval()
					meInterval()

					//가위바위보가 다 끝나후,승패결정
					if(1 > round){
						clearInterval(interval);
						clearInterval(interval2);
						el.checked = false;

						var result = document.getElementById('result');
						if(computerNowScore > myNowScore){
							result.textContent = '컴퓨터의 승!'
						}else if(computerNowScore < myNowScore){
							result.textContent = '나의 승!'
						}else{
							result.textContent = '비겼습니다.'
						}
					}
				},1000)

			})
		})
	})
})


//reset
document.getElementById('resetBtn').addEventListener('click',function(){
	document.querySelectorAll('section').forEach(function(el){
		el.classList.remove('active');
	})
	introEffect();
	//모두리셋	
	computer.innerHTML = '';
	me.innerHTML = '';
})


//나 컴퓨터

// 00 01 02
// 10 11 12
// 20 21 22

// 0 비김 -1 짐 -2 이김
// 1 이김 0 비김 -1 짐
// 2 짐   1 이김 0 비김

//비김 0
//짐 -1 ,2
// 이김 1,-2