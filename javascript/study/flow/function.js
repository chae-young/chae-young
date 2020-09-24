/*
호이스팅
자바스크립트는 변수선언과 함수선언을 끌어올린다.

선언만 위로 끌어올린다. 할당 x
선언에 할당할경우 분리가능.

var b;
b = function bb(){

}
*/

console.log(b);
var b = function bb(){
    return 1
}