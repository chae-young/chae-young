
//var a = 'a'+
'bdfsdf';

//var a = `a
//bdfsdf`;

//console.log(a)
//
const a = 10;
const b = 20;
const strBefore = a + '+' + b + '=' + (a+b);

const str = `${a} + ${b} = ${a+b}` //괄호안에 변수나 식,함수,삼항연산자 올수있음
console.log(str)


function test(){
    return `
    <div>
        <h1>fdsf</h1>    
    </div>
`.trim()
}
console.log(test())


const arr = [1,2,3];
const res = arr.reduce(function(p,c,i){
    console.log(p,c,i)
    return p + c // 반환되서 p로 다시감.
},10)
//이니션밸루 값을 제공하지 않으면 원래 배열수로 첫번째 건너 뛰고 두번째부터 시작

const arr2 = ['a','b']
const str2 = arr2.reduce(function(r,e,i,arr){
    return r + e
})
console.log(str2)
const arr3 = ['a','b']
const str3 = arr3.reduce(function(r,e,i,arr){
    r[e] = e;
    return r
},{})


//tag function
//템플릿리터럴앞에 tag를 써주면 알아서 문자와 숫자를 나눠준다

const tag = function(strs,arg1,arg2){//첫번째인자는 문자열,그뒤로는 숫자..
    return {strs:strs,args:[arg1,arg2]}
}
const res2 = tag `순서가 ${1}이렇게${2}` //함수 호출한것!
console.log(res2)

//문자열은 무조건 하나가 더 나올수밖에 없다.
//"" "순서가" "이렇게"

//string.raw > 날것의 문자 그대로 표현해준다.
//n 을 그대로 보여줌

const str4 = `red\n`;
console.log(String.raw `red\n`)
