
/*

//call by value
매개변수에서 속성을 바꾸면 참조가 되지만,
매개변수를 바궜을때 참조관계가 끊긴다

//생성자와 new

생성자 = 함수
엄격모드?
팩토리함수

var card = {
    name : '채영',
    hp : 10,
    type : '카드',
    attack : function(){
        console.log('방어')
    },
    defend : function(){
        console.log('방어')
    }
}

팩토리패턴 
객체를 리턴하는 함수
function 카드공장(name,att,hp){
    retrun {
        name : '채영',
        hp : 10,
        type : '카드',
        attack : function(){
            console.log('방어')
        },
        defend : function(){
            console.log('방어')
        }
    }
}
var card = 카드공장('채영',10,10)
var card2 = 카드공장('무지',10,10)


프로토타입
객체들간의 공유된거 따로만듬.


공통된거
var prototype = {  <-rhdxhdqnqns
    type : '카드',
    attack : function(){
        console.log('방어')
    },
    defend : function(){
        console.log('방어')
    }  
}
달라진거
var card = {
    name = '제로초',
    att = 10,
    hp = 10
}
card.__proto__ = prototype
__proto는 생략가능
card.type 이런식으로 ..
왜냐하면 자바스크립트가 객체의 속성을 찾을때 알아서 찾아줌


응용
var 프로토타입 = {
    type : '카드',
    attack : function(){
        console.log('방어')
    },
    defend : function(){
        console.log('방어')
    }  
}

>이건실무에서쓰면안되용
function 카드공장(name,hp){
    var 카드 = {
        name : '채영',
        hp : 10,
    }
    // 카드.__proto__ = 프로토타입 -> 참조됨. 
    

    return 카드
}


var 프로토타입 = {
    type : '카드',
    attack : function(){
        console.log('방어')
    },
    defend : function(){
        console.log('방어')
    }  
}
function 카드공장(name,hp){
    var 카드 = object.creat(프로토타입);
    카드.name = '채영',
    카드.hp = 10,

    return 카드
}
*/

var 프로토타입 = {
    type : '카드',
    attack : function(){
        console.log('방어')
    },
    defend : function(){
        console.log('방어')
    }  
}
function 카드공장(name,hp){
    var 카드 = Object.create(프로토타입);
    카드.name = '채영',
    카드.hp = 10

    return 카드
}
console.log(카드공장())
