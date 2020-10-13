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