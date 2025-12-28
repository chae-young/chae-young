import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `![header](https://capsule-render.vercel.app/api?type=wave&text=LeeChaeng!&height=250&fontColor=FFF&color=0:FFCEFF,100:ADCDFF&fontAlignY=35&fontSize=100)

Hello my friend 🤍  
I am frontend developer.
- I have experience in interactive publishing on agency and commerce platforms
- I like running and my specialty is traveling alone 🏃🏻‍♀️ 🎒
- I like new challenges 🤜🏻 🤛🏻
- You can check various contents on my blog

<br/>
<div>

<h4>ᴄᴏɴᴛᴀᴄᴛ</h4>
<a href="https://chaeyoung2.tistory.com/" target="_blank"><img src="https://img.shields.io/badge/blog-fd384a?style=flat-square&logo=Blogger&logoColor=white"/></a>
<a href="mailto:cycy8527@gmail.com" target="_blank"><img src="https://img.shields.io/badge/mail-000?style=flat-square&logo=gmail&logoColor=white"/></a>

<h4>ᴛᴇᴄᴋ</h4>
<!-- <img src="https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=html5&logoColor=white" >
<img src="https://img.shields.io/badge/css3-1572B6?style=flat-square&logo=css3&logoColor=white"> -->
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white">
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=black">
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"> 
<!-- <img src="https://img.shields.io/badge/styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white"> -->

<!-- <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=black"> -->

<!-- <img src="https://img.shields.io/badge/recoil-3578E5?style=flat-square&logo=recoil&logoColor=white"">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=flat-square&logo=reactquery&logoColor=white"">
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"> -->

<!-- <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white"> -->
<!-- <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white">

<br/>
<br/>

<br/>

<h4>ʟᴀᴛᴇꜱᴛ ʙʟᴏɢ ᴘᴏꜱᴛ</h4>

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://chaeyoung2.tistory.com/rss'); // 본인의 블로그 주소
    
    text += `<ul>`;
    
    // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 10; i++) {
        const {title, link} = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>
    ![header](https://capsule-render.vercel.app/api?type=wave&height=300&color=0:FFCEFF,100:ADCDFF&section=footer)
    `;
    
    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('업데이트 완료');
})();