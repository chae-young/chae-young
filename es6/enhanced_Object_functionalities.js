
//프로퍼티 축약

const a = 10
const b = 10;
/*const obj = {
    dfsdfsdfsdfsdfsdf:dsfsdfsdfsdfsdf
}
이렇게 긴 프로퍼티를..
요렇게.
*/

const obj = {
    x,
    y
}


//destructuring assignment

const{//변수선언
    name, //프로퍼티 축약을 사용
    age
} = { //객체
    name:'cy',
    age:03
}

//서로 매칭시킴



//concised method(간결한메소드)
var obj = {
    getName (){}, //함수 본연의 기능만. 프로토타입 ,생성자 x
    getNmae2 : function(){}
}
console.log()


//super()

const Person = {
    greeting() {return 'hello'}
}
const Friend = {
    greeting () {
        return 'hi,' + super.greeting()
    }
}
Object.setPrototypeOf(friend,Person)


//고정된 프로퍼티 열거순서..

 const obj1 = {
     c:1,
     2:2,
     a:3,
     0:4,
     b:5,
     1:6
 }
 const key1 = []
 for (const key in obj1){
     keys1.push(key)
 }//숫자는 순서대로..문자는 그대로..적용됨 //숫자가 먼저 그다음에 문자열 입력된 순서 그대로

 //프로퍼티는 숫자인데 첫글자가 0이 아니면 ? 숫자로 인식
 //객체열거순서 : 숫자오름차..문자..심볼이마지막..