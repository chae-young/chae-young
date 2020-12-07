

/*

__proto__ 생략가능.




*/

function Person(n,a){
    this.name = n;
    this.age = a;
}
var gomu = new Person('고무',30);
var iu = new Person('아이유',30);

/*
gomu.setOlder = function(){
    this.age += 1;
}
gomu.getAge = function(){
    return this.age;
}
iu.setOlder = function(){
    this.age += 1;
}
iu.getAge = function(){
    return this.age;
}
*/
Person.prototype.setOlder = function(){
    this.age += 1;
}
Person.prototype.getAge = function(){
    return this.age;
}


// gomu.setOlder() 로 불러오면 .앞이 this 이기 때문에 불러온다
/*

gomu.__proto__.setOlder()로 불러올경우
앞에 this가 프로토가됨.
프로토는 생략가능!!!!

 */

 /*

*/