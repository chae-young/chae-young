//let

for(let i = 0;i<100;i++){
    //console.log(i)//for문 블럭 안에서만
}

if(true){
    let my = 2;
   // console.log(my)
}

//클로저<-블록스코프화 지역변수화 시킴
//var list = document.querySelectorAll('li');
//for(let i = 0; i<list.length;i++){
//    list[i].addEventListener("click",function(){
        //console.log(i)
 //   })
//}


//const <-const 는 변수의 값을 못바꾼다. 바꾸면 오류남
//const를 기본으로 사용한다. 그런데 변경이 될수 있는 변수는 let을 사용한다.
//var 는 사용하지 않는다.

//const는 사용하더라도 배열과 오브젝트의 값을 변경하는 것은 가능하다. !!!
//값을 재할당하는 것만 불가능...

//immutable array를 어떻게 만들지..?
//카피본..값을 되돌리고 싶을때, 그때그때 데이터를 저장해서 값을 보여주고싶을경우
/*


*/

const list = ['a','b','c'];
list2 = list.concat('d');
//
console.log(list,list2)