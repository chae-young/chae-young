//하단 버튼 효과
var FooterBtn = document.querySelectorAll('.choice__btn');
FooterBtn.forEach(function(btn){
	btn.addEventListener('mouseover',function(){
		btn.classList.add('on');
	})
	btn.addEventListener('mouseleave',function(){
		btn.classList.remove('on');
	})
})


//주제
var title ={
	Fruits:['바나나','딸기','오렌지','사과','포도','귤','수박','복숭아','키위'],
	Exercise:['축구','야구','배드민턴','농구','태권도','복싱','달리기','피겨스케이팅','봅슬레이'],
	FF:['햄버거','피자','치킨','감자튀김','도넛','핫도그','삼각김밥','라면','샌드위치']
}
var hint ={
	Fruits:['원숭이','핑크색 우유','쥬스','백설공주','영동','겨울간식','여름간식','알레르기','골든'],
	Exercise:['월드컵','프로','라켓','서장훈','검은띠','링','100m','김연아','무한도전'],
	FF:['맥도날드,버거킹,롯데리아','도미노','양념','햄버거 친구','심슨??','명량','편의점 대표 음식','김밥 친구','서브웨이']
}



var tr,td,trArr,tdArr,newTit,newTitArr,rowArr,colArr,leftDiagArr,rightDiagArr,btnFruits,btnExercise,btnFF,form,userInput,inputBtn,call;

tr = document.querySelectorAll('tr');
trArr = [];
tdArr = [];
newTit = [];
newTitArr = [];
inputArr = [];
btnFruits = document.getElementById('btnFruits');
btnExercise = document.getElementById('btnExercise');
btnFF = document.getElementById('btnFF');
form = document.getElementById('form');
userInput = document.getElementById('userInput');
inputBtn = document.getElementById('inputBtn');
call = false;
	

	//테이블 만들기
	for(var i = 0; i <= 2; i++){
		tdArr.push([])

		for(var j = 0; j <= 2; j++){
			td = document.createElement('td');
			tr[i].appendChild(td);
			tdArr[i].push(td);
		}
	}; 		

	var randomName = function(tit){

		tdArr.forEach(function(tr){
			tr.forEach(function(td){
				td.classList.remove('on');
				td.classList.remove('all');
			})
		})

		alert('섞였습니다')
		 call = true;

		//랜덤섞기!
		while(newTit.length < 9){
			var randomTit = tit[Math.floor(Math.random() * tit.length)];
			if(newTit.indexOf(randomTit) == -1){
				newTit.push(randomTit);
			}
		}

		//텍스트 뿌리기
		for(var i = 0; i <= 2; i++){
			newTitArr.push(newTit.splice(0,3));	//[ [arr1],[arr1],[arr1],[arr1]...]
			if(newTitArr.length > 3){
				newTitArr.splice(0,3);
			}
			for(var j = 0; j <= 2; j++){
				tdArr[i][j].textContent = newTitArr[i][j];
			}
		}; 	
	}


	//입력했을때 검사 ing ..
	function textCheck(e){
		e.preventDefault();
			
		if(call == false){
			alert('주제 버튼을 클릭해주세요!');

		}else if(call){

			//입력했을때 색칠	
			function textHave(num){
				if(newTitArr[num][newTitArr[num].indexOf(userInput.value)] == userInput.value){
					tdArr[num][newTitArr[num].indexOf(userInput.value)].classList.add("on")
				}
				//입력한 단어 배열에 추가
				if(inputArr.indexOf(userInput.value) == -1){
					inputArr.push(userInput.value)
				}
			}

			if(newTitArr[0].indexOf(userInput.value) != -1){
				console.log('0 중 에 입력되어있다');
				textHave(0);
			}else if(newTitArr[1].indexOf(userInput.value) != -1){
				console.log('1 중 에 입력되어있다');			
				textHave(1);
			}else if(newTitArr[2].indexOf(userInput.value) != -1){
				console.log('2 중 에 입력되어있다');			
				textHave(2);			
			}

			//빙고 갯수
			var BingoNum = 0;
			function numInfo(){
				var numBox = document.getElementById('num');
				BingoNum = BingoNum + 1;
				numBox.innerHTML = BingoNum;
				
			}

			//가로줄
			if(
				inputArr.includes(tdArr[0][0].textContent) &&
				inputArr.includes(tdArr[0][1].textContent) &&
				inputArr.includes(tdArr[0][2].textContent)
				){
					console.log('첫째 가로줄');
					tdArr[0][0].classList.remove('on');
					tdArr[0][1].classList.remove('on');
					tdArr[0][2].classList.remove('on');
					tdArr[0][0].classList.add('all');
					tdArr[0][1].classList.add('all');
					tdArr[0][2].classList.add('all');
					numInfo();
				}
			if(
				inputArr.includes(tdArr[1][0].textContent) &&
				inputArr.includes(tdArr[1][1].textContent) &&
				inputArr.includes(tdArr[1][2].textContent)
				){
					console.log('둘째 가로줄')
					tdArr[1][0].classList.remove('on');
					tdArr[1][1].classList.remove('on');
					tdArr[1][2].classList.remove('on');
					tdArr[1][0].classList.add('all');
					tdArr[1][1].classList.add('all');
					tdArr[1][2].classList.add('all');
					numInfo();
				}
			if(
				inputArr.includes(tdArr[2][0].textContent) &&
				inputArr.includes(tdArr[2][1].textContent) &&
				inputArr.includes(tdArr[2][2].textContent)
				){
					console.log('셋째 가로줄')
					tdArr[2][0].classList.remove('on');
					tdArr[2][1].classList.remove('on');
					tdArr[2][2].classList.remove('on');
					tdArr[2][0].classList.add('all');
					tdArr[2][1].classList.add('all');
					tdArr[2][2].classList.add('all');
					numInfo();
				}
			//세로줄
			if(
				inputArr.includes(tdArr[0][0].textContent) &&
				inputArr.includes(tdArr[1][0].textContent) &&
				inputArr.includes(tdArr[2][0].textContent)
				){
					console.log('첫째 세로줄')
					tdArr[0][0].classList.remove('on');
					tdArr[1][0].classList.remove('on');
					tdArr[2][0].classList.remove('on');
					tdArr[0][0].classList.add('all');
					tdArr[1][0].classList.add('all');
					tdArr[2][0].classList.add('all');
					numInfo();
				}
			if(
				inputArr.includes(tdArr[0][1].textContent) &&
				inputArr.includes(tdArr[1][1].textContent) &&
				inputArr.includes(tdArr[2][1].textContent)
				){
					console.log('둘째 세로줄')
					tdArr[0][1].classList.remove('on');
					tdArr[1][1].classList.remove('on');
					tdArr[2][1].classList.remove('on');
					tdArr[0][1].classList.add('all');
					tdArr[1][1].classList.add('all');
					tdArr[2][1].classList.add('all');
					numInfo();
				}
			if(
				inputArr.includes(tdArr[0][2].textContent) &&
				inputArr.includes(tdArr[1][2].textContent) &&
				inputArr.includes(tdArr[2][2].textContent)
				){
					console.log('셋째 세로줄')
					tdArr[0][2].classList.remove('on');
					tdArr[1][2].classList.remove('on');
					tdArr[2][2].classList.remove('on');
					tdArr[0][2].classList.add('all');
					tdArr[1][2].classList.add('all');
					tdArr[2][2].classList.add('all');
					numInfo();
				}
			//왼쪽위대각선
			if(
				inputArr.includes(tdArr[0][0].textContent) &&
				inputArr.includes(tdArr[1][1].textContent) &&
				inputArr.includes(tdArr[2][2].textContent)
				){
					console.log('왼쪽위 대각선')
					tdArr[0][0].classList.remove('on');
					tdArr[1][1].classList.remove('on');
					tdArr[2][2].classList.remove('on');
					tdArr[0][0].classList.add('all');
					tdArr[1][1].classList.add('all');
					tdArr[2][2].classList.add('all');
					numInfo();
				}
			//오른쪽위대각선
			if(
				inputArr.includes(tdArr[0][2].textContent) &&
				inputArr.includes(tdArr[1][1].textContent) &&
				inputArr.includes(tdArr[2][0].textContent)
				){
					console.log('오른쪽위 대각선')
					tdArr[0][2].classList.remove('on');
					tdArr[1][1].classList.remove('on');
					tdArr[2][0].classList.remove('on');
					tdArr[0][2].classList.add('all');
					tdArr[1][1].classList.add('all');
					tdArr[2][0].classList.add('all');
					numInfo();
				}
			userInput.value = '';				
		}
	}					



	btnFruits.addEventListener('click',function(){ randomName(title.Fruits) })
	btnExercise.addEventListener('click',function(){ randomName(title.Exercise) })
	btnFF.addEventListener('click',function(){ randomName(title.FF) })
	form.addEventListener('submit',textCheck)