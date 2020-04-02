/*
데이터 == 화면

1.실행 클릭했을때 값을 입력받아 지뢰데이터,지뢰테이블만들기
2.지뢰갯수만큼 지뢰를 랜덤으로심기
3.지뢰가 아닌곳을 클릭했을때 지뢰가 몇개인지 주변칸에서 표시
*/

var datamine = [];
var tbody = document.querySelector('#table tbody');
var x = 'x';
var datatable = {

}

document.getElementById('exec').addEventListener('click',function(){
	tbody.innerHTML = '';
	datamine = [];

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
				//클릭한칸이 몇번째 칸이고 몇번째 줄인지
				var thisparent = e.currentTarget.parentNode;
				var thisTopparent = e.currentTarget.parentNode.parentNode;
				var thisLine = Array.prototype.indexOf.call(thisTopparent.children,thisparent)
				var thisBox = Array.prototype.indexOf.call(thisparent.children,e.currentTarget)
				
				var aroundBox = [];
				console.log(datamine[thisLine][thisBox])
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
