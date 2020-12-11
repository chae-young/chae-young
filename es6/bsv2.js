//반복문 내 함수 실행 시

let funcs = [];
for(let i = 0; i < 10; i++){
    funcs.push(function(){ //배열에 함수 추가할 경우
        console.log(i)
    })
}
funcs.forEach(function(f){
    f() //함수실행
})

console.log(funcs)