var a = function(){
    return new Date()
}
//function 지우고 뒤에 화살표!!!!
var a = () => {
    return new Date()
}
//반환값이 리턴밖에없으면 리터럴생략가능..!!1
var a = () => new Date()

//인자가 하나밖에 없으면? 괄호 생략 가능!
var b = a => a * a
//>매개변수가 아예 없으면 괄호써줘야함

//객체를 리턴할 경우엔 괄호를 넣어주어야함. 왜냐면 객체로 인식안하고 함수본문으로 인식해서
var e = (x) => ({
    x:x
})

//this 바인딩 하지않음. (블록스코프,)
//arrow function은 함수스코프.실행컨텍스트 생성시 this를 바인딩 하지 않을뿐
const obj = {
    a(){
        console.log(this)//obj
        const b = () => {
            console.log(this)//obj 같은 객체로나옴!

    
        }
    }
}

//call은 this바인딩되지않음..
//concise method , arrow function 은 프로토타입프로퍼티 x -> 생성자함수로 x
//메소드는 메소드로만 arrow는 함수로만
//arrow는 내부함수로만 쓸때사용