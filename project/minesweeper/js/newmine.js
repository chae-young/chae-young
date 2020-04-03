/*
데이터 == 화면

1.실행 클릭했을때 값을 입력받아 지뢰데이터,지뢰테이블만들기
2.지뢰갯수만큼 지뢰를 랜덤으로심기
3.지뢰가 아닌곳을 클릭했을때 지뢰가 몇개인지 주변칸에서 표시
4.지뢰인곳을 오른쪽클릭했을때 느낌표 물음표 설정. 
5.지뢰인곳클릭하면 팡!
6.0인곳을 클릭하면 옆에칸이 열어지도록
*/

var datamine = [];
var tbody = document.querySelector('#table tbody');
var x = 'x';
var flag = false;
var datatable = {

}

document.getElementById('exec').addEventListener('click',function(){
	tbody.innerHTML = '';
	datamine = [];
	flag = false;

	var hor = parseInt(document.getElementById('hor').value);
	var ver = parseInt(document.getElementById('ver').value);
	var mine = parseInt(document.getElementById('mine').value);

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
				
				//주변지뢰열기
				if(aroundnum == 0){
					
				}

				//지뢰면
				if(datamine[thisLine][thisBox] == x){
					e.currentTarget.textContent = '팡'
					flag = true;
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
					e.currentTarget.textContent = '?';
				}else if(e.currentTarget.textContent == '?'){
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
	while(allminenum.length > 80){
		var movenum = allminenum.splice(Math.floor(Math.random() * allminenum.length),1)[0]
		minenum.push(movenum)
	}

	//지뢰심기
	for(var k = 0; k < minenum.length; k++){
		var minehor = Math.floor(minenum[k] / 10);
		var minever = minenum[k] - (hor * minehor);
		tbody.children[minehor].children[minever].textContent = x;
		datamine[minehor][minever] = x;
	}

})
