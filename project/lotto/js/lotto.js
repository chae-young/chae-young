var num = [];
while(num.length < 45){
	num.push(Math.floor(Math.random() * 45) + 1);
	num = num.filter(function(item, idx, arr) {
	   return arr.indexOf(item) == idx;
	})
};

var winNum = num.slice(0,6).sort(function(a,b){
	return a - b;	
})

var startBtn = document.getElementById('lottoBtn');
//var spin = num.reverse();
var ball = document.querySelectorAll('#ball li');


startBtn.addEventListener('click',function(){
	var reset = 0;
	Array.prototype.slice.call(ball).forEach(function(el,idx,arr){
		var child = el.children;
		Array.prototype.slice.call(child).forEach(function(ballNum){
			ballNum.innerHTML = '';
			startBtn.textContent = '버튼을 눌러주세요'
			ballNum.classList.remove('set');

			var interval = setInterval(function(){
				ballNum.textContent = num[Math.floor(Math.random() * 45)];
			},500)

			setTimeout(function(){	
				clearInterval(interval)
				ballNum.classList.add('set');
				ballNum.textContent = winNum[idx];
				reset++;

				console.log('몇 : ',reset,ballNum)
				if(reset == 6){
					setTimeout(function(){
						startBtn.textContent = '다시 뽑기'
					},1000)
				}
			}, (idx + 1) * 1000)

		})
	})
})
