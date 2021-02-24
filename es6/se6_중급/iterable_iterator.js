
//generator
function* generator(){
    yield 1 //yield 를 만나면 멈춘다 뭐할때? next를 호출할때
    yield 2
    yield 3
}
const gene = generator()
//console.dir(gene.next()) //iterable한 객체
const arrAll = [1,2,3]
const makeGene = itera => function*(){
    yield* itera // [arrAll] ->*은 안에 있는것을 펼쳐서 각각의 yield로 만들어라
    // yield 1
    // yield 2
    // yield 3
}
//console.log(makeGene(arrAll)())



const map = new Map( [['a',1],['b',1]] )
//console.log(...map)//펼치기

const itera = map[Symbol.iterator]();
//console.log('이터럴:',itera) //iterable한 객체는 Symbol.iterator를 가지고있다
//console.log(itera.next())


//for of
for(let x of [1,2,3]){
    //console.log(x)//배열의 symbol.iterator 가 호출되면서 그 next를 호출해 그 값이 x 에 담김.
}



//iterator

const iter = {
    items:[1,2,3],
    count:0,
    next(){
        const done = this.count >= this.items.length
        return{
            done,//true가 되야 끝남
            value: !done ? this.items[this.count++] : undefined
        }
    }
}
console.log(iter.next())
