//매개변수 기본값
const f = function(x=4,y=5,z=6){//기본값이 할당됨 값이없을 경우에만!
    console.log(x,y,z)
}
f(null)//이렇게 하면 null을 적용하고 싶을경우 null이 적용됨

//식도 가능
const a = function(a = 1,b = a + 1,c = 2){
    console.log(a,b,c)
}
console.log(a(null))


//식도 가능하니 함수도 가능.
const notValid = function(){
    console.error('에러');
    return 10
}
const sum = function(x = notValid(),y = notValid()){ // 기본값에 에러창 넣어놓기..
    console.log(x+y)
}
console.log(sum())

//나머지 매개변수
function yy(y,...z){
    console.log(z)
}
console.log(yy(1,2,3,4,5))



const obj = {
    _a:'a',
    get a() { return this._a; },
    set a(v) { this._a = v; }

}
console.log(obj.a)