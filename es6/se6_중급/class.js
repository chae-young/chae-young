class Person{
    constructor(name){this.name = name}; // 생성자함수의 this였다,생성자함수라고 생각
    getName (){return this.name}//프로토타입 메소드
    static isPerson (obj) {return obj instanceof this}//생성자함수만 쓸수있는 static 메소드
}
const cy = new Person('채영')
//console.log(cy)

//기명 클래스 표현식
const a = class Person2{}
//console.log(a)

//익명 클래스 표현식
const b = class {}
//console.log(b.name)

//class내부 메소드를 열거할수 없다.
class A {
    a(){}
    static b(){}
}
A.prototype.c = function(){}
for (let p in A.prototype){
    console.log(p)
}

