const a = Symbol('a'); //a변수에 접근가능한곳에서만 심볼 a 라는 값에 접근가능..
const b = Symbol();

//a === b 는 다르다

const x = ()=> {
    const a = Symbol('a');
    return{
        [a]:10, //이상태에서 y가 접근하면 ? 접근이 안됨.(값은 쓸수있고 노출은 되어있는 퍼블릭한 상태)
        a:a //y접근가능. a라는 속성을 타고올라가자나요..값으로나오기때문에
    }
}

const y = x();
console.log(y)

//Reflect.ownkeys(y)로 접근가능.





const obj = {}
const sym = Symbol();
obj[sym] = 'a';
//console.log(obj)


////////////////////////객체의 프로퍼티 키로 활용////////////////
//심볼을 객체프로퍼티 사용할 경우 [] 사용

const NAME = Symbol('이름'); //상수개념으로 쓰기때문에 대문자로!
const GENDER = Symbol('성별');

const iu ={
    [NAME]:'아이유',
    [GENDER]:'여자',
    age:26
}
const suzy ={
    [NAME]:'수지',
    [GENDER]:'여자',
    age:20
}
console.log(iu[NAME],suzy)

//열거되지않는다.
for(const prop in iu){
    console.log(prop,iu[prop])
}
//객체안에있는 심볼들만 열거해주는 메소드
Object.getOwnPropertySymbols(iu).forEach( el =>{
    console.log(el,iu[el])
})
//객체안에있는 심볼포함해서 모두
Reflect.ownKeys(iu).forEach( el =>{
    console.log(el,iu[el])
})
