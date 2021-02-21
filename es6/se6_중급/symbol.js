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
//console.log(y)

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
//console.log(iu[NAME],suzy)

//열거되지않는다.
for(const prop in iu){
    //console.log(prop,iu[prop])
}
//객체안에있는 심볼들만 열거해주는 메소드
Object.getOwnPropertySymbols(iu).forEach( el =>{
    //console.log(el,iu[el])
})
//객체안에있는 심볼포함해서 모두
Reflect.ownKeys(iu).forEach( el =>{
    //console.log(el,iu[el])
})



//private member for,object.keys,getpropertynames~ 열거되지 않음
const obj2 = (()=>{
    const _privateMember1 = Symbol('private1');
    const _privateMember2 = Symbol('private1');
    return{
        [_privateMember1]:'외부에선 보이지만 접근x',
        [_privateMember2]:10,
        publicMember1:20,
        publicMember2:30,
    }
})()

//console.log(obj2)
//console.log(obj2[Symbol('private1')])//새로운 심볼을 만든것
//console.log(obj2[_privateMember1])//스코프에의해 접근x


//symbol.for 공유심볼
const c = Symbol.for('a')//문자열 을 생략했을때 undefined 반환
const f = Symbol.for('a')
console.log(c===f)//문자열만 가지고 판단. 만약 위에서 선언하고 다시 선언할경우 이미 가지고 있는걸 가져와서 할당

const obj3 = (()=>{
    const COMMON1 = Symbol.for('공유심볼')
    return{
        [COMMON1] : '안뇽?'
    }
})()
console.log(obj3)
console.log(obj3[Symbol.for('공유심볼')])//common1변수로는 스코프땜에 접근이 안되지만 공유심볼의 문자열을 알고 있으면 어디선 접근가능


 const com1 = Symbol.for('공유심볼2')
 const UNCOMMON = Symbol('비공유심볼')
 const commonSymbolKey1 = Symbol.keyFor(com1)//변수에서 ..? 심볼 for값을 출력해줌
 const commonSymbolKey2 = Symbol.keyFor(UNCOMMON)
 console.log(commonSymbolKey2)//그냥 심볼은 출력안됨