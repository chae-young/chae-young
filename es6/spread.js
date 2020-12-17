const values = [20,10,30,50]

//배열에서 가장 큰 요소 찾기
console.log(Math.max.apply(null,values))//apply는 배열을 두번째로 받음

//펼치기쓰면 ??
console.log(Math.max(...values))


let orArr = [2,3]
const preArr = [-2,-1];
const sufArr = [6,7];

//이렇게 한것을
orArr.unshift(1)
orArr.push(4)

//요렇게!
orArr = [0,...orArr,5]