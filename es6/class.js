function Person(n,a){
    this.name = n;
    this.age = a;
}

var gomu = new Person('고무곰',30)
// gomu.setOlder = function(){
//     return this.age
// }
Person.prototype.setOlder = function(){
    return this.age
}
console.log(gomu.setOlder())
console.log(Person.setOlder())