

var 상대 = {
    영웅:document.getElementById('rival-hero'),
    덱:document.getElementById('rival-deck'),
    필드:document.getElementById('rival-cards'),
    코스트:document.getElementById('rival-cost'),
    덱data: [],
    영웅data:[],
    필드data:[],
    선택카드:null,
    선택카드data:null,
}

var 나 = {
    영웅:document.getElementById('my-hero'),
    덱:document.getElementById('my-deck'),
    필드:document.getElementById('my-cards'),
    코스트:document.getElementById('my-cost'),
    덱data: [],
    영웅data:[],
    필드data:[],
    선택카드:null,
    선택카드data:null,
}

var 턴버튼 = document.getElementById('turn-btn');
var 턴 = true; //트루면 내턴,false면 니턴

function 덱에서필드로(데이터,내턴){//데이터가 없기때문에 돔연결에서 가져옴
    var 객체 = 내턴 ? 나 : 상대;
    var idx = 객체.덱data.indexOf(데이터);
    var 현재코스트 = Number(객체.코스트.textContent);
    if(현재코스트 < 데이터.cost){ //현재코스트가 끝나면 클릭x
        return true; //카드돔연결과 연결됨
    }        
    객체.덱data.splice(idx,1);
    객체.필드data.push(데이터);
    //화면과 데이터 일치
    객체.덱.innerHTML = '';//화면지우고
    객체.필드.innerHTML = '';
    객체.필드data.forEach(function(data){//다시그리기
        카드돔연결(data,객체.필드)
    })
    객체.덱data.forEach(function(data){
        카드돔연결(data,객체.덱)
    }) 
    
    데이터.field = true; //참조관계이기 때문에 데이터가 바뀜..

    나.코스트.textContent = 현재코스트 - 데이터.cost;

}
//상대인지아닌지 확인후 다시그린다.
function 화면다시그리기(내화면){//내화면 true 상대 false
    var 객체 = 내화면 ? 나 : 상대;
    객체.덱.innerHTML = '';
    객체.필드.innerHTML = '';
    객체.영웅.innerHTML = '';
    객체.필드data.forEach(function(data){//다시그리기
        카드돔연결(data,객체.필드)
    })
    객체.덱data.forEach(function(data){
        카드돔연결(data,객체.덱)
    }) 
    카드돔연결(객체.영웅data,객체.영웅,true)
}
function 카드돔연결(데이터,돔,영웅){
    var 카드 = document.querySelector('.card-hidden .card').cloneNode(true);
    카드.querySelector('.card-cost').textContent = 데이터.cost;
    카드.querySelector('.card-att').textContent = 데이터.att;
    카드.querySelector('.card-hp').textContent = 데이터.hp;
    if(영웅){
        카드.querySelector('.card-cost').style.display = 'none';
        var 이름 = document.createElement('div');
        이름.textContent = '영웅';
        카드.appendChild(이름);
    }

    카드.addEventListener('click',function(card){
        console.log(데이터.mine)
        if(턴){// 내턴이면
            if(!카드.classList.contains('card-turnover')){//턴오버된거는 안되용{
                console.log(!카드.classList.contains('card-turnover'))
                //return;
            }
            if(!데이터.mine && 나.선택카드){//상대카드면서 내카드가 선택되어 있고
                
                데이터.hp = 데이터.hp - 나.선택카드data.att //상대방체력에 내 공격력을 뺌
                if(데이터.hp <= 0){//카드가 죽었을때
                    //데이터를제거
                    var 인덱스 = 상대.필드data.indexOf(데이터);
                    if(인덱스 > -1){//쫄병이 죽었을때
                        상대.필드data.splice(인덱스,-1);//잘라내기
                    }else{//영웅이 죽었을떄
                        alert('승리했다')
                        초기세팅()
                    }
                }
                화면다시그리기(false)//상대화면
                나.선택카드.classList.remove('card-selected');
                나.선택카드.classList.add('card-turnover');
                나.선택카드 = null;//내가 선택한 카드 해제
                나.선택카드data = null;
                return;
            }else if(!데이터.mine){//상대카드면
                return
            }
            if(데이터.field){//카드가 필드에 있으면
                //card-selec을 모두 제거하고 선택한 것만 추가
                //비효율적이지만 ..아예 모든카드를 해제하고 현재 카드를 선택하는(사람입장에서는 효율적인..?)
                카드.parentNode.querySelectorAll('.card').forEach(function(card){
                    card.classList.remove('card-selected')
                })
                카드.classList.add('card-selected');
                나.선택카드 = 카드//내가선택한 카드를 변수에 저장
                나.선택카드data = 데이터
            }else{//덱에 있으면
                if(!덱에서필드로(데이터,true)){
                    //계속 카드가 생겨야함
                    내덱생성(1);
                }
            }
        }else{//상대방
            if(!카드.classList.contains('card-turnover')){//턴이끝난카드는 아무일도 일어나지 않음
                console.log(!카드.classList.contains('card-turnover'))
                //return;
            }
            if(데이터.mine && 상대.선택카드){//내카드면서 상대카드가 선택되어 있으면 공격
                
                데이터.hp = 데이터.hp - 상대.선택카드data.att //상대방체력에 내 공격력을 뺌
                if(데이터.hp <= 0){//카드가 죽었을때
                    //데이터를제거
                    var 인덱스 = 나.필드data.indexOf(데이터);
                    if(인덱스 > -1){//쫄병이 죽었을때
                        나.필드data.splice(인덱스,-1);//잘라내기
                    }else{//영웅이 죽었을떄
                        alert('패배했다')
                        초기세팅();
                    }
                }                
                화면다시그리기(true)//내화면
                상대.선택카드.classList.remove('card-selected');
                상대.선택카드.classList.add('card-turnover');
                상대.선택카드 = null;//내가 선택한 카드 해제
                상대.선택카드data = null;
                return;
            }else if(데이터.mine){
                return
            }
            if(데이터.field){
                카드.parentNode.querySelectorAll('.card').forEach(function(card){
                    card.classList.remove('card-selected')
                })
                카드.classList.add('card-selected');
                상대.선택카드 = 카드//내가선택한 카드를 변수에 저장
                상대.선택카드data = 데이터
            }else{
                
                if(!덱에서필드로(데이터,false)){
                    상대덱생성(1);
                }
            }               
        }
    })

    돔.appendChild(카드)
}

function 상대덱생성(개수){
    for(var i = 0; i < 개수; i++){
        카드공장();
        상대.덱data.push(카드공장());
    }
    상대.덱.innerHTML = ''; //데이터와 화면 일치
    상대.덱data.forEach(function(data){
        카드돔연결(data,상대.덱)
    })

}
function 내덱생성(개수){
    for(var i = 0; i < 개수; i++){
        카드공장();
        나.덱data.push(카드공장(false,true));
    }
    나.덱.innerHTML = ''; //데이터와 화면 일치
    나.덱data.forEach(function(data){
        카드돔연결(data,나.덱)
    })    
}
function 내영웅생성(){
    나.영웅data = 카드공장(true,true);//영웅이기때문에
    console.log(나.영웅data)
    카드돔연결(나.영웅data,나.영웅,true)
}
function 상대영웅생성(){
    상대.영웅data = 카드공장(true);
    카드돔연결(상대.영웅data,상대.영웅,true)
}


//팩토리패턴 : 대부분 비슷한데 조금씩 다른 객체를 찍어내기위해
function Card(영웅,내카드){
    if(영웅){//생성자함수를 분기처리 할 수 있다
        this.att = Math.floor(Math.random() * 5);
        this.hp = Math.floor(Math.random() * 5) + 25;//체력업!   
        this.hero = true;     
        this.field = true;//영웅은 첨부터 필드에
    }else{
        this.att = Math.floor(Math.random() * 5);
        this.hp = Math.floor(Math.random() * 5);
        this.cost = Math.floor( (this.att + this.hp) / 2); //합계
    }
    if(내카드){//내카드인지 아닌지
        this.mine = true;
    }
}

function 카드공장(영웅,내카드){//영웅은 체력은 높고 cost는 없다
    return new Card(영웅,내카드);
}

function 초기세팅(){
    상대덱생성(5);
    내덱생성(5);
    내영웅생성();
    상대영웅생성();   
    화면다시그리기(true);
    화면다시그리기(false);
}

턴버튼.addEventListener('click',function(){
    //턴을 넘기기전에 턴오버된것을 다시그려줌
    var 객체 = 턴 ? 나 : 상대;
    console.log(객체)
    객체.필드.innerHTML = '';
    객체.영웅.innerHTML = '';
    객체.필드data.forEach(function(data){//다시그리기
        카드돔연결(data,객체.필드)
    })
    카드돔연결(객체.영웅data,객체.영웅,true)  

    턴 = !턴; // 턴을넘김
    if(턴){//턴 넘길때마다 다시 10으로 채워줌
        나.코스트.textContent = 10;
    }else{
        상대.코스트.textContent = 10;
    }
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
    //
  
});

초기세팅();