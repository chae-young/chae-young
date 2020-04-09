/*
데이터 == 화면

1.실행 클릭했을때 값을 입력받아 지뢰데이터,지뢰테이블만들기
2.지뢰갯수만큼 지뢰를 랜덤으로심기
3.지뢰가 아닌곳을 클릭했을때 지뢰가 몇개인지 주변칸에서 표시
4.지뢰인곳을 오른쪽클릭했을때 느낌표 물음표 설정. 
5.지뢰인곳클릭하면 팡!
6.0인곳을 클릭하면 클릭한칸의 주변 0칸이 열어지도록
*/


setTimeout(function(){
	document.querySelector('.loading').style.display = 'none';
},5000)

var datamine = [];
var tbody = document.querySelector('#table tbody');
var result = document.getElementById('result')
var x = 'x';
var flag = false;
var opennum = 0;
var timeNum = 0;

var datatable = {
	open:1,
	mine1:-1,
	mine2:-2,
	mine3:-3,
	mine4:-4,
	mine5:-5,
	mine6:-6,
	mine7:-7
}
function stopwatch(){
	timeNum++;
	var timer = {
		seconds:Math.floor(timeNum%60),
		min:Math.floor(timeNum/60%60),
	}	
	if(timer.seconds < 10){
		timer.seconds = '0' + timer.seconds;
	}
	if(timer.min < 10){
		timer.min = '0' + timer.min;
	}
	document.getElementById('timer').innerHTML = timer.min + ' : ' + timer.seconds;		
}
var swt;

document.getElementById('exec').addEventListener('click',function(){
	
	tbody.innerHTML = '';
	datamine = [];
	flag = false;
	opennum = 0;
	timeNum = 0;
	result.textContent = '';

	var hor = parseInt(document.getElementById('hor').value);
	var ver = parseInt(document.getElementById('ver').value);
	var mine = parseInt(document.getElementById('mine').value);

	if(!hor == false && !ver == false && !mine == false){
		/*clearInterval(swt)

		setTimeout(function(){
			stopwatch();
			swt = setInterval(stopwatch,1000);
		},0)*/


		for(var i = 0; i < hor;i++){
			var tr = document.createElement('tr');
			var arr = [];
			tbody.appendChild(tr)
			datamine.push(arr)
			
			for(var j = 0; j < ver;j++){
				var td = document.createElement('td');
				//칸 클릭.
				td.addEventListener('click',function(e){
					if(flag){
						return;
					}

					//클릭한칸이 몇번째 칸이고 몇번째 줄인지
					var thisparent = e.currentTarget.parentNode;//클릭한칸의 부모
					var thisTopparent = e.currentTarget.parentNode.parentNode;//클릭한칸의 최상위부모
					var thisLine = Array.prototype.indexOf.call(thisTopparent.children,thisparent);//클릭한 줄
					var thisBox = Array.prototype.indexOf.call(thisparent.children,e.currentTarget);//클릭한 칸
					

					//지뢰면 
					if(datamine[thisLine][thisBox] == x){
						//e.currentTarget.textContent = '팡'
						flag = true;
						clearInterval(swt);
						minesss('<img src="images/mine.png' + '"alt="">')
						result.textContent = '지뢰찾기 실패.. 할수있습니다 다시도전!!';
					}else{
						e.currentTarget.classList.add('opend');
						
						if(datamine[thisLine][thisBox] != datatable.open){
							opennum += 1;
						}
						datamine[thisLine][thisBox] = datatable.open;	

						//주변지뢰열기
						var aroundBox = [datamine[thisLine][thisBox-1],datamine[thisLine][thisBox+1]];
						if(datamine[thisLine-1]){
							aroundBox = aroundBox.concat( [datamine[thisLine-1][thisBox-1],datamine[thisLine-1][thisBox],datamine[thisLine-1][thisBox+1]] )
						}
						if(datamine[thisLine+1]){
							aroundBox = aroundBox.concat( [datamine[thisLine+1][thisBox-1],datamine[thisLine+1][thisBox],datamine[thisLine+1][thisBox+1]] )
						}

						var aroundnum = e.currentTarget.textContent = aroundBox.filter(function(v){
							return v == x;
						}).length
						
						//주변지뢰개수가 0 이면 그 주변칸의 0인 애들을 연다..?
						if(aroundnum == 0){
							tbody.children[thisLine].children[thisBox].textContent = '';
							var aroundZero = [
								tbody.children[thisLine].children[thisBox-1],
								tbody.children[thisLine].children[thisBox+1]
							];
							if(tbody.children[thisLine-1]){
								aroundZero = aroundZero.concat( 
									[
									tbody.children[thisLine-1].children[thisBox-1],
									tbody.children[thisLine-1].children[thisBox],
									tbody.children[thisLine-1].children[thisBox+1]
									] 
								)
							}
							if(datamine[thisLine+1]){
								aroundZero = aroundZero.concat( 
									[
									tbody.children[thisLine+1].children[thisBox-1],
									tbody.children[thisLine+1].children[thisBox],
									tbody.children[thisLine+1].children[thisBox+1]
									]
								)
							}
							
							aroundZero.filter(function(v){
								return !!v
							}).forEach(function(el){
								//요소의 위치를 알아야함.
								var thisparent = el.parentNode;
								var thisTopparent = el.parentNode.parentNode;
								var thisLine = Array.prototype.indexOf.call(thisTopparent.children,thisparent);
								var thisBox = Array.prototype.indexOf.call(thisparent.children,el);
								var num = 1;
						
								if(datamine[thisLine][thisBox] != datatable.open){
									el.click();
									//el.classList.add('opend');
								}
							})
						}else if(aroundnum == 1){
							//datamine[thisLine][thisBox] = datatable.mine1;
							tbody.children[thisLine].children[thisBox].style.color = 'blue';
						}else if(aroundnum == 2){
							//datamine[thisLine][thisBox] = datatable.mine2;
							tbody.children[thisLine].children[thisBox].style.color = 'green';
						}else if(aroundnum == 3){
							//datamine[thisLine][thisBox] = datatable.mine3;
							tbody.children[thisLine].children[thisBox].style.color = 'red';
						}else if(aroundnum == 4){
							//datamine[thisLine][thisBox] = datatable.mine4;
							tbody.children[thisLine].children[thisBox].style.color = 'pink';
						}else if(aroundnum == 5){
							//datamine[thisLine][thisBox] = datatable.mine5;
							tbody.children[thisLine].children[thisBox].style.color = 'yellow';
						}else if(aroundnum == 6){
							//datamine[thisLine][thisBox] = datatable.mine6;
							tbody.children[thisLine].children[thisBox].style.color = 'purple';
						}else if(aroundnum == 7){
							//datamine[thisLine][thisBox] = datatable.mine7;
							tbody.children[thisLine].children[thisBox].style.color = 'orange';
						}

						if(opennum == hor*ver-mine){
							flag = true;
							clearInterval(swt)
							result.textContent = '#지뢰찾기#성공적';					
						}

					}

				})
				td.addEventListener('contextmenu',function(e){
					e.preventDefault();
					var thisparent = e.currentTarget.parentNode;//클릭한칸의 부모
					var thisTopparent = e.currentTarget.parentNode.parentNode;//클릭한칸의 최상위부모
					var thisLine = Array.prototype.indexOf.call(thisTopparent.children,thisparent);//클릭한 줄
					var thisBox = Array.prototype.indexOf.call(thisparent.children,e.currentTarget);//클릭한 칸

					if(e.currentTarget.textContent == x){
						e.currentTarget.textContent = '!';
					}else if(e.currentTarget.textContent == '!'){
						e.currentTarget.textContent = x;
					}
				})
				tr.appendChild(td);
				arr.push(0)
			}
		}
		
		//지뢰갯수
		var allminenum = Array(hor*ver).fill().map(function(v,idx){
			return idx
		})
		var minenum = [];
		while(allminenum.length > hor*ver-mine){
			var movenum = allminenum.splice(Math.floor(Math.random() * allminenum.length),1)[0]
			minenum.push(movenum)
		}
		
		//지뢰심기
		var minesss = function(img){	
			for(var k = 0; k < minenum.length; k++){
				var minehor = Math.floor(minenum[k] / hor);
				var minever = minenum[k] - (hor * minehor);
				tbody.children[minehor].children[minever].innerHTML = img;
				datamine[minehor][minever] = x;
			}
		}
		minesss('');
	}else{
		alert('값을 입력해주세요.')
	}
})
//<img src="images/mine.png' + '" alt="">