

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
            if(!데이터.mine){//상대카드고 내카드가 선택되어있으면 공격
                데이터.hp = 데이터.hp - 나.선택카드.att //상대방체력에 내 공격력을 뺌
                나.선택카드.classList.remove('card-selected');
                나.선택카드.classList.add('card-turnover');
                나.선택카드 = null;//내가 선택한 카드 해제
                나.선택카드data = null;
                return;
            }else if(!데이터.mine){//상대카드면

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
            if(데이터.mine || 데이터.field){//내카드라면
                return;
            }                   
            if(!덱에서필드로(데이터,false)){
                상대덱생성(1);
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
        나.코스트.textContent = 10;
    }else{
        상대.코스트.textContent = 10;
    }
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
});

초기세팅();