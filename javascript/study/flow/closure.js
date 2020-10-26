/*
접근권한제어
지역변수보호
데이터 보존 및 활용
*/
function a(){
    var x = 1;
    return function b(){
        console.log(x)
    }
}
var c = a();
c()
// x 를 외부 c에서 접근가능하다.


//getter는 객체의 특정 프로퍼티 값을 가져오도록 하기 위한 메소드입니다.
//setter는 객체의 특정 프로퍼티 값을 설정하기 위한 메소드입니다.

function a(){
    var _x = 1;
    return{
        get x(){return _x};
        set x(v){_x = v;}
    }
}
var c = a();
c.x = 10 //외부에서 x 값을 바꿀수 있다