function* generator(){
    console.log(1)
    yield 1
    console.log(2)
    yield 2
    console.log(3)        
}
const gen = generator()
//console.log(gen.next()) // 1 넘겨주고 next() 호출시 2 넘겨주고..

//표현식
const gen2 = function*(){yield}
//객체
const obj = {
    gen1:function*(){yield},
    *gen2(){}
}
//클래스
class A {
    *gen2(){}
}


/*
gengerator를 사용하면 symbol.itertor 안에 yield만 반환하면 됨.
yield 가 알아서 정지했다가 done을 반환해주니까..
기존에 return 객체를 반환하고..next()메소드를 반환하고 할필요 가 없음.
*/

const obj1 = {
    a:1,
    b:2,
    c:3,
    *[Symbol.iterator](){
        for(let prop in this){
            yield [prop,this[prop]] //배열안에
        }
    }
}
//console.log(...obj1)//펼치기


//yield 가 *이 붙으면?
function* gene3(){
    yield* [1,2,3,4,5] //next()호출시 배열 원소를 하나하나 다 순회
    yield
    yield* 'ad'
}
//또 중첩사용 가능
function* genall1(){
    yield[1,3]
    yield[2,3]
}
function* genall2(){
    yield[1,3]
    yield[2,3]
}
function* genall3(){
    yield* genall1()
    yield* genall2()
}
const genall = genall3()



//인자넘기기
function* geneP(){
    let first = yield 1
    let second = yield first + 2
}
/*
let first
yield 1 = > next() 호출 후 중단됨.

다음 next()호출 할경우 first 변수에 값이 없음. yield 에서 중단되고
값이 없으니까..tdz 상태
그래서 인자값을 넘겨주면 그 변수에 적용된다
*/
const genP = geneP()
//console.log(genP.next())
//console.log(genP.next(10))