var table = document.getElementById('tictactoeTable');
var tbody = document.querySelector('tbody');
var tr = document.querySelectorAll('tr');
var td = document.querySelectorAll('td');
var trArr = Array.prototype.slice.call(tr);
var tdArr = Array.prototype.slice.call(td);
var tdAll = [];
var turn = 'X';

var result = false;

for(i = 0; i <= 2; i++){
	tdAll.push(tdArr.splice(0,3))
}
td.forEach(function(el,idx){
	var trLine;

	el.addEventListener('click',function(event){
		if(result == true){
			return;
		}
			trLine = trArr.indexOf(event.target.parentNode);
			tdLine = tdAll[trLine].indexOf(event.target);

		
		if(el.textContent == ''){
			console.log('빈칸입니다')
			el.textContent = turn;
			
			//칸이 다 안채워져 있을때 턴 바꾸기
		
			//가로
			if(
				tdAll[trLine][0].textContent == turn &&
				tdAll[trLine][1].textContent == turn &&
				tdAll[trLine][2].textContent == turn
			){
				result = true;
				console.log('나의승리')
			}
			//세로
			if(
				tdAll[0][tdLine].textContent == turn &&
				tdAll[1][tdLine].textContent == turn &&
				tdAll[2][tdLine].textContent == turn
			){
				console.log('나의승리')
			}
			//대각선
			if(
				tdAll[0][0].textContent == turn &&
				tdAll[1][1].textContent == turn &&
				tdAll[2][2].textContent == turn
			){
				console.log('나의승리')
			}
			if(
				tdAll[0][2].textContent == turn &&
				tdAll[1][1].textContent == turn &&
				tdAll[2][0].textContent == turn
			){
				console.log('나의승리')
			}
			//turn = 'O';
			setTimeout(function(){
				console.log('컴퓨터차례');

				//클릭했을때의 주변 빈칸에 랜덤으로 o를 넣는다.
				var emptyTd = [ tdAll[trLine][tdLine-1],tdAll[trLine][tdLine+1] ];

				if(!tdAll[trLine-1]){ 
					emptyTd = emptyTd.concat([ tdAll[trLine+1][tdLine-1],tdAll[trLine+1][tdLine],tdAll[trLine+1][tdLine+1] ]  )
					//console.log(emptyTd)	
				}
				if(!tdAll[trLine+1]){ 
					emptyTd = emptyTd.concat([ tdAll[trLine-1][tdLine-1],tdAll[trLine-1][tdLine],tdAll[trLine-1][tdLine+1] ]  )
					//console.log(emptyTd)	
				}
				if(trLine == 1){
					emptyTd = emptyTd.concat([ 
						tdAll[trLine-1][tdLine-1],tdAll[trLine-1][tdLine],tdAll[trLine-1][tdLine+1],
						tdAll[trLine+1][tdLine-1],tdAll[trLine+1][tdLine],tdAll[trLine+1][tdLine+1]
					])	
					//console.log(emptyTd)				
				}
			
				var textEemTd = emptyTd.filter(function(t){
					if(t != undefined){
						return t.textContent == '';
					}
				})
				console.log(textEemTd)

				//클릭한줄에 x가 2개이상이고 그줄에 남은자리가 언디파인드면 o를 추가.
				//가로줄,세로줄,대각선줄
				var hturnbox = [];
				var vturnbox = [];
				var plturnbox = [];
				var prturnbox = [];
				var hor = tdAll[trLine];
				var ver = [tdAll[0][tdLine],tdAll[1][tdLine],tdAll[2][tdLine]];
				var polyleft = [tdAll[0][0],tdAll[1][1],tdAll[2][2]];
				var polyright = [tdAll[0][2],tdAll[1][1],tdAll[2][0]];
				
				//가로
				hor.forEach(function(box,idx,arr){				
					hturnbox.push(box)
				})
				var htd = hturnbox.filter(function(x){
					return x.textContent == turn
				}).length

				var huntd = hturnbox.filter(function(x){
					return x.textContent == '';
				})

				var hountd = hturnbox.filter(function(x){
					return x.textContent == 'O';
				}).length

				//세로
				ver.forEach(function(box,idx,arr){				
					vturnbox.push(box)
				})
				var vtd = vturnbox.filter(function(x){
					return x.textContent == turn
				}).length

				var vuntd = vturnbox.filter(function(x){
					return x.textContent == '';
				})

				var vountd = vturnbox.filter(function(x){
					return x.textContent == 'O';
				}).length

				//대각선왼쪽
				polyleft.forEach(function(box,idx,arr){				
					plturnbox.push(box)
				})
				var pltd = plturnbox.filter(function(x){
					return x.textContent == turn
				}).length

				var pluntd = plturnbox.filter(function(x){
					return x.textContent == '';
				})
				var plountd = plturnbox.filter(function(x){
					return x.textContent == 'O';
				}).length

				//대각선오른쪽
				polyright.forEach(function(box,idx,arr){				
					prturnbox.push(box)
				})
				var prtd = prturnbox.filter(function(x){
					return x.textContent == turn
				}).length

				var pruntd = prturnbox.filter(function(x){
					return x.textContent == '';
				})
				var prountd = prturnbox.filter(function(x){
					return x.textContent == 'O';
				}).length
				
				if(htd == 2 && huntd.length == 1){
					huntd[0].textContent = 'O';
				}
				else if(vtd == 2 && vuntd.length == 1){
					vuntd[0].textContent = 'O';
				}
				else if(pltd == 2 && pluntd.length == 1){
					pluntd[0].textContent = 'O';
				}
				else if(prtd == 2 && pruntd.length == 1){
					pruntd[0].textContent = 'O';
				}
				else if(htd < 2 && vtd < 2 && pltd < 2 && prtd < 2){
					console.log(htd < 2)
					textEemTd[Math.floor(Math.random() * textEemTd.length)].textContent = 'O';			
				}	

				if(hountd == 2 && huntd.length == 1){
					huntd[0].textContent = 'O';
				}else if (vountd == 2 && vuntd.length == 1){
					vuntd[0].textContent = 'O';
				}else if(plountd == 2 && pluntd.length == 1){
					pluntd[0].textContent = 'O';
				}else if(prountd == 2 && pruntd.length == 1){
					pruntd[0].textContent = 'O';
				}

			},0)
		}else{	
			console.log('빈칸아닙니다');
		}
	})
})

          
/*
00 01 02
10 11 12
20 21 22

-1
0 
1

00 01 02
13 14 15
26 27 28
39 310 311

00 01 02
10 11 12
20 21 22

00
11
22
['x','','']


02
11
20

//칸에 x가 있으면  o를 넣는다


[줄-1][0] [줄-1][1] [줄-1][2]
[줄][0] [1][1] [줄][2]
[줄+1][0] [줄+1][1] [줄+1][2]


// 클릭했을때 x가 2개라면 줄을 파악해서[????]


0 0 0
0  0

var 주변 = [dataset[줄][칸-1],dataset[줄][칸+1],dataset[줄-1][칸-1],dataset[줄-1][칸],dataset[줄-1][칸+1]];
if(dataset[줄-1]){//끝에줄 방지
	주변 = 주변.concat([dataset[줄-1][칸-1],dataset[줄-1][칸],dataset[줄-1][칸+1]]);
}
if(dataset[줄+1]){//밑에줄 방지
	주변 = 주변.concat([dataset[줄+1][칸-1],dataset[줄+1][칸],dataset[줄+1][칸+1]]);
}

e.currentTarget.textContent = 주변.filter(function(v){
	return v === 'x';
}).length;    

색깔을 골라서 숨겨놓고
만약 빨간색을고르면
빨간색을 찾는거임.

파란색을 선택할경우 꽝!

생활계획표
input:값에 시간입력




*/

