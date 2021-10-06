/*프로미스 인스턴스에서 finally,catch,then 을 쓸수있다.
reject,resolve 자체 static 메소드.

1. pending 비동기처리가 끝나기전 상태
2. resolved 확정상태 (fulfilled (성공), rejected (실패))
*/

const a = (params) =>
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

const b = a(true);
