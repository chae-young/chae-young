//1.tdz

(function(){
    var a = 10;
    (function(){
        //console.log(a);
        var a = 20;
    })();
    //console.log(a)
})();


//var 호이스팅 변수명만 위로 끌어올리고 undefined

if(true){
    let a = 10;
    if(true){
        //console.log(a)
        const a = 20;
    }
   // console.log(a)
}

//let 호이스팅 변수명만 위로 끌어올리고 끝.


//2.this

var value = 0;
var obj = {
    value:1,
    setValue:function(){
        this.value = 2; // 여기this랑 따로 쓰고 싶을때 this바인딩 하지 않음
        {
            this.value = 2;
        }
    }
}
console.log(obj.setValue())
console.log(obj.value)



//3.모든 문 형태 에 적용
for(let i = 0; i <= 10; i++){
    //i 는 블락스코프 안에서만 적용
}