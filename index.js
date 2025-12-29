import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD 헤더 템플릿
 */
const README_HEADER = `![header](https://capsule-render.vercel.app/api?type=wave&text=LeeChaeng!&height=250&fontColor=FFF&color=0:FFCEFF,100:ADCDFF&fontAlignY=35&fontSize=100)

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

/**
 * README.MD 푸터 템플릿
 */
const README_FOOTER = `

![header](https://capsule-render.vercel.app/api?type=wave&height=300&color=0:FFCEFF,100:ADCDFF&section=footer)`;

/**
 * 블로그 설정
 */
const BLOG_CONFIG = {
  rssUrl: 'https://chaeyoung2.tistory.com/rss',
  maxPosts: 5
};

/**
 * RSS 피드에서 최신 포스트를 가져오는 함수
 * @param {string} rssUrl - RSS URL
 * @param {number} maxPosts - 최대 포스트 수
 * @returns {Promise<Array>} 포스트 배열
 */
async function getLatestPosts(rssUrl, maxPosts) {
  const parser = new Parser({
    headers: {
      Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }
  });

  try {
    console.log('RSS 피드 파싱 중...');
    const feed = await parser.parseURL(rssUrl);
    
    if (!feed.items || feed.items.length === 0) {
      throw new Error('RSS 피드에 항목이 없습니다.');
    }

    const posts = feed.items.slice(0, maxPosts).map((item, index) => {
      console.log(`${index + 1}번째 게시물: ${item.title}`);
      return {
        title: item.title || '제목 없음',
        link: item.link || '#'
      };
    });

    return posts;
  } catch (error) {
    console.error('RSS 파싱 에러:', error.message);
    throw error;
  }
}

/**
 * 포스트 목록을 HTML 리스트로 변환하는 함수
 * @param {Array} posts - 포스트 배열
 * @returns {string} HTML 문자열
 */
function generatePostsList(posts) {
  if (!posts || posts.length === 0) {
    return '<p>최근 블로그 포스트를 불러올 수 없습니다.</p>';
  }

  const listItems = posts.map(post => 
    `<li><a href='${post.link}' target='_blank'>${post.title}</a></li>`
  ).join('\n');

  return `<ul>\n${listItems}\n</ul>`;
}

/**
 * README.md 파일을 생성하는 함수
 * @param {string} content - README 내용
 */
function writeReadmeFile(content) {
  try {
    writeFileSync('README.md', content, 'utf8');
    console.log('✅ README.md 업데이트 완료!');
  } catch (error) {
    console.error('❌ 파일 쓰기 에러:', error.message);
    throw error;
  }
}

/**
 * 메인 실행 함수
 */
async function updateReadme() {
  try {
    console.log('🚀 README.md 업데이트 시작...');
    
    // 최신 포스트 가져오기
    const posts = await getLatestPosts(BLOG_CONFIG.rssUrl, BLOG_CONFIG.maxPosts);
    
    // HTML 리스트 생성
    const postsList = generatePostsList(posts);
    
    // 최종 README 내용 조합
    const readmeContent = README_HEADER + postsList + README_FOOTER;
    
    // 파일 쓰기
    writeReadmeFile(readmeContent);
    
  } catch (error) {
    console.error('❌ README 업데이트 실패:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
updateReadme();