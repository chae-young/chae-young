//해체할당,구조분해할당,디스트럭쳐링

//배열해체할당
var color  = ['r','b','c']
const [f,b,c] = color // 순서대로 변수값에 넣어준다..

//세번째꺼 추출하굎으면? 컴마찍기
let [,,c]=color

//바꿔도 가능
let [,,c] = ['r','b','c']

//매칭할게없으면 언디파인드

//rest 파라미터와 연동
const arr = [1,2,3];
const [a,...b] = color //<-앞에는 f고 뒤에 나머지 bc
const [,,...b] = cp;or

//디폴트파라미터

const [c,d = c * 2] = [5] //5,10
const [e = f,f] = [undefined,10]//tdz에 걸림..먼저선언안되요


//값교환 아주간단하게
var a = 10
var b = 20
[b,a] = [a,b]


/*오른쪽왼쪽 매칭을 잘하기
일부분만 하고 싶으면 컴마찍기
*/




//객체할당
//매칭해주기
const iu = {
    name:'아이유',
    age:23
}
//const면 const로 변수되고 let이면 let로 됨
const {
    name:n,
    age:a
} = iu

const {
    name, //축약형일경우 name = name 으로 담겠다
    age
} = iu


//변수명만 겹치면안되는...?
//디폴트파라미터
//아래에서 위로도 위로에서 아래로 읽는거와 떡같은..