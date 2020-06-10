var 상대영웅 = document.getElementById('rival-hero');
var 내영웅 = document.getElementById('my-hero');
var 상대덱 = document.getElementById('rival-deck');
var 내덱 = document.getElementById('my-deck');
var 상대필드 = document.getElementById('rival-cards');
var 내필드 = document.getElementById('my-cards');
var 상대코스트 = document.getElementById('rival-cost');
var 내코스트 = document.getElementById('my-cost');
var 턴버튼 = document.getElementById('turn-btn');
var 상대덱data = [];
var 내덱data = [];
var 내영웅data;
var 상대영웅data;
var 상대필드data = [];
var 내필드data = [];
var 턴 = true; //트루면 내턴,false면 니턴

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
        if(턴){// 내턴이면
            if(!데이터.mine || 데이터.field){//상대카드라면 상대필드에 있음ㄴ
                return;
            }
            
            var 현재코스트 = Number(내코스트.textContent);
            if(현재코스트 < 데이터.cost){
                return;
            }

            var idx = 내덱data.indexOf(데이터);
            내덱data.splice(idx,1);
            내필드data.push(데이터);
            //화면과 데이터 일치
            내덱.innerHTML = '';//화면지우고
            내필드.innerHTML = '';
            내필드data.forEach(function(data){//다시그리기
                카드돔연결(data,내필드)
            })
            내덱data.forEach(function(data){
                카드돔연결(data,내덱)
            }) 
            
            데이터.field = true; //참조관계이기 때문에 데이터가 바뀜..

            내코스트.textContent = 현재코스트 - 데이터.cost;
            //계속 카드가 생겨야함
            내덱생성(1);
        }else{//상대방
            if(데이터.mine || 데이터.field){//내카드라면
                return;
            }   
            var 현재코스트 = Number(상대코스트.textContent);
            if(현재코스트 < 데이터.cost){
                return;
            }                    
            var idx = 상대덱data.indexOf(데이터);
            상대덱data.splice(idx,1);
            상대필드data.push(데이터);
            상대덱.innerHTML = '';
            상대필드.innerHTML = '';            
            상대필드data.forEach(function(data){
                카드돔연결(data,상대필드)
            })
            상대덱data.forEach(function(data){
                카드돔연결(data,상대덱)
            })        
            
            상대코스트.textContent = 현재코스트 - 데이터.cost;
            상대덱생성(1);
        }
    })

    돔.appendChild(카드)
}

function 상대덱생성(개수){
    for(var i = 0; i < 개수; i++){
        카드공장();
        상대덱data.push(카드공장());
    }
    상대덱.innerHTML = ''; //데이터와 화면 일치
    상대덱data.forEach(function(data){
        카드돔연결(data,상대덱)
    })

}
function 내덱생성(개수){
    for(var i = 0; i < 개수; i++){
        카드공장();
        내덱data.push(카드공장(false,true));
    }
    내덱.innerHTML = ''; //데이터와 화면 일치
    내덱data.forEach(function(data){
        카드돔연결(data,내덱)
    })    
}
function 내영웅생성(){
    내영웅data = 카드공장(true,true);//영웅이기때문에
    console.log(내영웅data)
    카드돔연결(내영웅data,내영웅,true)
}
function 상대영웅생성(){
    상대영웅data = 카드공장(true);
    카드돔연결(상대영웅data,상대영웅,true)
}


//팩토리패턴 : 대부분 비슷한데 조금씩 다른 객체를 찍어내기위해
function Card(영웅,내카드){
    if(영웅){//생성자함수를 분기처리 할 수 있다
        this.att = Math.floor(Math.random() * 5);
        this.hp = Math.floor(Math.random() * 5) + 25;//체력업!   
        this.hero = true;     
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
}

턴버튼.addEventListener('click',function(){
    턴 = !턴;
    if(턴){//턴 넘길때마다 다시 10으로 채워줌
        내코스트.textContent = 10;
    }else{
        상대코스트.textContent = 10;
    }
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
});

초기세팅();