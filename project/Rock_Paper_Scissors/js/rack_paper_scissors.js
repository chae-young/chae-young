var computer = document.getElementById('computer');
var me = document.getElementById('me');

var RPS = {
	rock: 'images/noun_rock.png',
	paper:'images/noun_paper.png',
	scissors:'images/noun_scissors.png'
}
var RPSempty = [RPS.rock,RPS.paper,RPS.scissors];
var RPSemptyRd = Math.floor(Math.random() * RPSempty.length);
var imageSrc = RPSempty[RPSemptyRd]; //첫이미지

var interval;
var interval2;

//컴퓨터의 랜덤이미지 
function RPSinterval(){
	interval = setInterval(function(){
		if(imageSrc == RPS.rock){
			imageSrc = RPS.scissors;
		}else if(imageSrc == RPS.scissors){
			imageSrc = RPS.paper;
		}else{
			imageSrc = RPS.rock;
		}
		computer.innerHTML = "<img src='" + imageSrc + "' alt=''>";	
	},500)
}

function meinterval(){
	interval2 = setInterval(function(){
		if(imageSrc == RPS.rock){
			imageSrc = RPS.scissors;
		}else if(imageSrc == RPS.scissors){
			imageSrc = RPS.paper;
		}else{
			imageSrc = RPS.rock;
		}
		me.innerHTML = "<img src='" + imageSrc + "' alt=''>";	
	},500)
}										


var radio = document.querySelectorAll('input');
var round = 0;

radio.forEach(function(el){

	function radioVal(){
		el.addEventListener('change',function(){
			round = el.value
			RPSinterval();
			meinterval()
		})
	}
	radioVal()
})


function computerSelec(imageSrc){
	return Object.entries(RPS).find(function(el){
		return el[1] == imageSrc; //images/noun_Paper.png
	})[0]
}

var score = {
	rock: 0,
	paper: -1,
	scissors: 1
}

var computerTxt = document.getElementById('computerNowScore');
var myTxt = document.getElementById('myNowScore');
var computerNowScore = 0;
var myNowScore = 0;

var btn = document.querySelectorAll('.btn');

btn.forEach(function(btn){
	btn.addEventListener('click',function(){
		clearInterval(interval);
		clearInterval(interval2);

		round--
		var mySelec = this.getAttribute('name');
		var myScore = score[mySelec];
		var computerScore = score[computerSelec(imageSrc)]
		var scoreDifference = myScore - computerScore;
		
		if(scoreDifference === 0){
			console.log('비겼습니다')
		}else if([2,-1].includes(scoreDifference)){
			console.log('이겼습니다');
			myNowScore = myNowScore + 1;
			myTxt.textContent = myNowScore;
		}else{
			console.log('졌습니다')		
			computerNowScore = computerNowScore + 1;
			computerTxt.textContent = computerNowScore;
		}

		setTimeout(function(){
			RPSinterval()
			meinterval()
			//가위바위보가 다 끝나후,승패결정
			if(1 > round){
				clearInterval(interval);
				clearInterval(interval2);
				console.log(round)
				var result = document.getElementById('result');
				if(computerNowScore > myNowScore){
					result.textContent = '컴퓨터의 승!'
				}else{
					result.textContent = '나의 승!'
				}
			}
		},1000)		
	})
})


//컴퓨터의 랜덤 이미지
//나의 랜덤이미지

//버튼을클릭하면
//컴퓨터와 나의 이미지가 같이 멈춘다.


// 가위: 1, 바위: 0, 보: -1
// 나\컴퓨터	  가위   바위    보
//			가위   1 1    1 0   1 -1
//			바위   0 1    0 0   0 -1
//			  보  -1 1   -1 0  -1 -1

/*
1 - 1 = 0 //비김
1 - 0 = 1 //짐
1 - -1 = 2 // 이김

0 - 1 = -1 //이김
0 - 0 = 0 //비김
0 - -1 = 1 //짐

-1 --1 = 0 //짐
-1 - 0 = -1 //이김
-1 --1 = 0 //비김


컴퓨터가 이긴경우 : 1,0
내가 이긴경우 : 2,-1
*/

/*
var 시작값 = 3;
var 인터벌2 = setInterval(function() {
  if (시작값 === 0) {
    console.log('종료!!!');
    return clearInterval(인터벌2);
  }
  console.log(시작값);
  시작값 -= 1; //변수에서 1을 뺀후 다시 변수에 대입
}, 1000);

*/

