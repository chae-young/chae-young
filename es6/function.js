//new target ->new 함수가 붙은게 타겟

/*
ES5
function Person (name){
    console.log(this)
    if(this instanceof Person){//this가 person의 인스턴스이면
        this.name = name;
    }else{
        throw new Error('new 연산자를 사용해라')
    }
}
console.log(new Person())
*/

function Person(name){
    if(new.target !== undefined){
        this.name = name;
    }else{
        throw new Error('new 연산자를 사용하세요')
    }
}