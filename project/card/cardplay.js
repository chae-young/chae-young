/*
	1.카드 19개를 만든다.
	2.순서대로 뜨게 만든다. 그리고 전체카드 앞면을 보여주고 다시 덮는다.
*/

for(var i = 0; i < 18; i++ ){
	var cardbasic = document.getElementById('card');	
	var card = cardbasic.cloneNode(true);
	document.getElementById('wrap').appendChild(card);

	var img = document.querySelector('.back');
	(function test(j){
		setTimeout(function(){
			document.querySelectorAll('.card')[j].classList.add('flip');
		},100*j)
	})(i)
}

