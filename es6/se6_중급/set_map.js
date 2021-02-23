//set
const a = [1,2,3,5,4,3,3,3,2,1];
const b = a.reduce((a,v)=>{
    if(a.includes(v)) return a
    a.push(v)
    return a
}, [])
//console.log(b)


const c = new Set() //new 꼬옥 써야해요
//const c = new Set([1,0,2,3,4,5,6]) //초기값 지정가능
c.add('d')
c.size
c.has//includes 같은 존재
c.delete()//삭제
c.clear()
//console.log(c)


const ss = new Set([...c])//set 을 담을 수 있다. 이터러블한 객체라면 다 가능

//중복제거 배열
const arr = [1,2,2,2,2,3,4,4,4,5];
const newArr = [...new Set(arr)];
//console.log(newArr,c)

//weakset

const f = new WeakSet()//참조 카윤트를 하지않음 - > 객체한테 알리지않음



//map
const map = new Map()
map.set(1,10)//add 랑 같음 첫번째가 key 두번째가 value
map.set(01,20)//덮어씌움
map.set('01',30)
map.set({},40)
map.set(function(){},()=>{})
//map.size
//map.get('name')//키값 가져오기
//map.delete('name')//키값 가져오기
//map.has('name')//키값 가져오기
//console.log(map)

//초기값지정가능
const arr2 = [[10,10],[false,true]]//리터벌해야하고 키와 값으로 이루어진 배열이어야함 
const map1 = new Map(arr2);
const mkeys = map1.keys();
// console.log(map1.keys())
// console.log(map1.values())
// console.log(map1.entries())
// console.log(mkeys.next())
// console.log(mkeys.next())
//console.log(mkeys.next())//리터러블하여 done > ture로 끝남
//
//배열로 전환
const map3 = new Map([[1,1],['10','10']]);
const mapArr1 = [...map3];
const mapArr2 = [...map3.keys()];
const mapArr3 = [...map3.values()];
const mapArr4 = [...map3.entries()];
//console.log(mapArr1,mapArr4)


//weakMap ->weakSet 과 비슷..참조형데이터여야하고 키값이 참조형이어야함..

let obj1 = {a:1}//1
const map4 = new Map()
map4.set(obj1,10) //2
obj1 = null // 1

let obj2 = {b:1}//1
const wmap = new WeakMap()
wmap.set(obj2,20) //1
obj1 = null // 0

//console.log(wmap)//언젠가 가비지가됨.

//프라이빗한 멤버만들기.
const weakmapValAdd = (wmap,key,val) => {
    wmap.set(key, Object.assign({}, wmap.get(key),val))
}
