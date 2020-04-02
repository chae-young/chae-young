var tbody = document.querySelector('#table tbody');
//지뢰테이블 만들기
var dataset=[];
var 중단플래그 = false;
var 열은칸 = 0;
var 코드표 = {
  연칸: -1,
  물음표: -2,
  깃발: -3,
  깃발지뢰: -4,
  물음표지뢰: -5,
  지뢰: 1,
  보통칸: 0,
};

document.querySelector('#exec').addEventListener('click',function(){
    tbody.innerHTML = '';//내부먼저 초기화
    document.getElementById('result').textContent = '';
    dataset = [];//데이터 초기화
    중단플래그 = false; //코드의 흐름을 좌우하는 변수
    열은칸 = 0;

    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    

    //지뢰위치뽑기 가로*세로 후보군코드는 알아두자! 
    var 후보군 = Array(hor * ver).fill().map(function(요소,인덱스){
        return 인덱스;//0 99 까지
    })

    //1부터100까지에서 지뢰개수만큼 랜덤숫자를 뽑는다
    var 셔플 = []; //(지뢰를심을숫자)
    while(후보군.length > hor * ver - mine){
        var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length),1)[0]
        셔플.push(이동값);
    }


    //테이블 만들기
    for(var i = 0;i < ver;i++){//tr을 먼저만들기(세로)
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for(var j = 0;j < hor;j++){
            arr.push(코드표.보통칸)//기본으로 0
            var td = document.createElement('td');
            //모든칸들
            td.addEventListener('contextmenu',function(e){
                e.preventDefault();
                if(중단플래그){
                    return;
                }                
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children,e.currentTarget);//유사배열이라서 ..
                var 줄 = Array.prototype.indexOf.call(부모tbody.children,부모tr);
               // console.log(부모tr,부모tbody,칸,줄);
                
				if (dataset[줄][칸] === 코드표.연칸) { // 이미 연 칸은 오른쪽 눌러도 효과 없게
				  return;
				}

                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'x'){
                    e.currentTarget.textContent = '!';
					e.currentTarget.classList.add('flag');
				  if (dataset[줄][칸] === 코드표.지뢰) {
					dataset[줄][칸] = 코드표.깃발지뢰;
				  } else {
					dataset[줄][칸] = 코드표.깃발;
				  }
                }else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
					e.currentTarget.classList.remove('flag');
					e.currentTarget.classList.add('question');
				  if (dataset[줄][칸] === 코드표.깃발지뢰) {
					dataset[줄][칸] = 코드표.물음표지뢰;
				  } else {
					dataset[줄][칸] = 코드표.물음표;
				  }
                }else if(e.currentTarget.textContent === '?'){
					e.currentTarget.classList.remove('question');
                    if(dataset[줄][칸] == 코드표.물음표지뢰){
                        e.currentTarget.textContent = 'x';
						dataset[줄][칸] == 코드표.지뢰;
                    }else{
                        e.currentTarget.textContent = '';
						dataset[줄][칸] == 코드표.보통칸
                    }
                }
            })            
            td.addEventListener('click',function(e){
                if(중단플래그){
                    return;
                }                
                //클릭했을때 주변 지뢰 개수
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children,e.currentTarget);//유사배열이라서 ..
                var 줄 = Array.prototype.indexOf.call(부모tbody.children,부모tr);
               
				if ([코드표.연칸, 코드표.깃발, 코드표.깃발지뢰, 코드표.물음표지뢰, 코드표.물음표].includes(dataset[줄][칸])) {//열려있는칸은 클릭이벤트 끝낸기
				  return;
				}
                
                e.currentTarget.classList.add('opend');
                열은칸 += 1;
                
                if(dataset[줄][칸] == 코드표.지뢰){//지뢰면
                    e.currentTarget.textContent = '팡';
                    document.getElementById('result').textContent = '실패'
                    중단플래그 = true;
                }else{//내가 클릭했을때 주변지뢰(x)가 몇개인지
 

                    //현재줄
                    var 주변 = [dataset[줄][칸-1],dataset[줄][칸+1],];
                    if(dataset[줄-1]){//끝에줄 방지
                        주변 = 주변.concat([dataset[줄-1][칸-1],dataset[줄-1][칸],dataset[줄-1][칸+1]]);
                    }
                    if(dataset[줄+1]){//밑에줄 방지
                        주변 = 주변.concat([dataset[줄+1][칸-1],dataset[줄+1][칸],dataset[줄+1][칸+1]]);
                    }
				   var 주변지뢰개수 = 주변.filter(function(v) {
					 return [코드표.지뢰, 코드표.깃발지뢰, 코드표.물음표지뢰].includes(v);
				   }).length;

                    e.currentTarget.textContent = 주변지뢰개수 || '';//앞에값이 false이면 뒤에것을 써라 

                    dataset[줄][칸] = 코드표.연칸;//열었을때 1로 바꿈

                    if(주변지뢰개수 == 0){
                        //주변8칸 동시오픈(재귀함수 -> 반복문을 함수로 표현하는 방법)
                        var 주변칸 = [];
                        if(tbody.children[줄-1]){
                            주변칸 = 주변칸.concat([
                            tbody.children[줄-1].children[칸-1],
                            tbody.children[줄-1].children[칸],
                            tbody.children[줄-1].children[칸+1],
                            ])
                        }
                        주변칸 = 주변칸.concat([
                            tbody.children[줄].children[칸-1],
                            tbody.children[줄].children[칸+1],
                        ])
                       if(tbody.children[줄+1]){
                            주변칸 = 주변칸.concat([
                            tbody.children[줄+1].children[칸-1],
                            tbody.children[줄+1].children[칸],
                            tbody.children[줄+1].children[칸+1],
                          ])
                        }
                        주변칸.filter(function(v){//배열에서 언디파인드인 애들을 제거
                            return !!v
                        }).forEach(function(옆칸){//주변칸이 클릭되도록.
                            var 부모tr = 옆칸.parentNode;
                            var 부모tbody = 옆칸.parentNode.parentNode;
                            var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children,옆칸);
                            var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children,부모tr);                        
                            if(dataset[옆칸줄][옆칸칸] !== 코드표.연칸){//한번연칸은 열지않고
                                옆칸.click(); //클릭하면 위에 td.click이 실행되는..재귀적으로 열어가는 구조
                            }
                        })                         
                    }              
                }
                if(열은칸 == hor * ver - mine){
                    중단플래그 = true;
                    document.getElementById('result').textContent = '승리';
                }
            })
            tr.appendChild(td);
            //td.textContent = '1';
        }
        tbody.appendChild(tr);

    }

    //지뢰심기 예를 들어 59가 6번째 9 칸에 들어가야한다면..
    for(var k = 0;k < 셔플.length; k++){
        var 세로 = Math.floor(셔플[k] / ver);
        var 가로 = 셔플[k] % ver;
        tbody.children[세로].children[가로].textContent = 'x'; //유사배열 tr,td
        dataset[세로][가로] = 코드표.지뢰;//데이터와 화면 일치
    }
    console.log(dataset,셔플)
})


/*
function 재귀함수(숫자){
	console.log(숫자)

	재귀함수(숫자 + 1)

}

재귀함수(2);

*/
