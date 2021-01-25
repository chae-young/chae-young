/*
1.block scope

스코프 : 유효범위
함수스코프 : 함수에 의해서 생기는 범위. 

블락스코프 등장! : 블락에 의애 생기는 유효범위.

{ } 에 의해서 생기는 변수의 유효범위가 결정.

호이스팅이 될까?
호이스팅은 하나 tdz 로 인해 값을 할당하지 않는다.

 TDZ : 임시사각지대.
 ->이 구간에서는 레퍼런스 에러가 나와야함
 

 console.log(a) // 여기서 에러가 나와야함.!
 const a = 1;
*/


/*
var 일 경우 에러가 나오지 않는다.
언디파인드를 할당하기 때문에.
*/

/*
this
{}으로 감싸준다.
*/
    var obj = {
        value:1,
        setVal:function(){
            this.value = 2;
            {
                this.value = 3; //this 바인딩 하지 않음.
                console.log(this)
            }
        }
    }
    console.log(obj.setVal())


    /*
    모든문 형태에 적용한다 !!
    
    for문의 괄호 안에도
    블락스코프에 갇힌다!!

    */