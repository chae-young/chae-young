/*프로미스 인스턴스에서 finally,catch,then 을 쓸수있다.
reject,resolve 자체 static 메소드.

1. pending 비동기처리가 끝나기전 상태
2. resolved 확정상태 (fulfilled (성공), rejected (실패))
*/

const testPromise = (params) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (params) {
                resolve("해결완료");
            } else {
                reject(Error("실패"));
            }
        }, 3000);
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

const a = testPromise(true);

//한번 프로미스는 영원하다. 계속 then으로 사용 가능
a.then((res) => {
    console.log("두번째 호출");
});

/*
then,catch 는 후순위로 실행(큐에 담겨져있다가 실행).
resolve,reject는 먼저호출된것만 실행(이미 호출되면 resolve된 상태로 끝나기때문에 실행되고 끝나는것)
*/
const testPromise2 = new Promise((resolve, reject) => {
    resolve();
    reject();
    console.log("promise");
});
testPromise2.then((res) => {
    console.log("성공");
});

/*
인스턴스가 promise가 만들어지면서 resolve가 될때 값이 만들어지는거에서
resolve일때 값을 미리 정할수있다.

*/

const testPromise3 = (val) =>
    Promise.resolve(val).then((res) => {
        console.log(res);
    });
testPromise3(10);

/*
pending thenable하지 않다.
fulfiled thenable하다

tehable한 객체가 오면 그 값을 반환한다
*/
const thenable = {
    then(resolve, reject) {
        // 꼭 resolve를 시켜줘야 then을 탈수있다.
        resolve(3);
    },
};
const testPromise4 = Promise.resolve(thenable);

/*
프로미스체이닝

then catch 안에서 
return 하면 promise 객체에 리턴값이 반환된다(resolve 상태로 변환)
새 promise 인스턴스 이면 그 프로미스가 리턴됨


retrun 을 하면 resolve 상태가 되기 때문에 값이 넘어가고
return 안하면  undefined

*/

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("첫번째 프라미스");
    }, 1000);
})
    .then((res) => {
        console.log(res);
        return "성공";
    })
    .then((res) => {
        return console.log("두번째 값");
    })
    .catch((err) => {
        return new Error("에러입니다"); // 일반 값 리턴
    })
    .then((res) => {
        throw new Error("두번째 에러"); // 중단시키고 에러메세지 띄어라
    });
