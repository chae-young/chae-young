/*

전역공간 : window , global
함수 : window , global (전역객체)
메소드 호출시 : 메소드 주체
>> var a = {
    b:function(){

    }
}
b라는 메소드 앞에 . a 가 있으니
a가 this임.
메소드 바로 앞에 . 이 this!

콜백에서 : 
함수내부에서와 동일하지만
call,applu,bind  사용해 this바인딩 가능.

*/

/*

클로저: 함수가 선언된 당시의 환경의 정보
스코프와 밀접한 관련이 있다.
최초 선언된 정보를 유지.


*/
/*내부함수에서 this 우회법 (스코프체인)*/
var a = 10;
var obj = {
    a:20,
    b:function(){
        var self = this.a;
        console.log(this.a);//20
        function c(){
            console.log(self.a)//10 
        }
    }
}


/* call apply bind */

function a(x,y,z){
    console.log(this,x,y,z);
}
var b = {
    c:2
}
var c = a(b); //bind 는 새로운 함수 생성 호출하지 않음.
c(1,2,3)// 그래서 변수에 담아줌. 매개변수 넣기.

// 또는 

var c = a(b,1,2)//미리 ths랑 매개변수 담아놓고,
c(3)// 끝에 매개변수만 넣어주기.
