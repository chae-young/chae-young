import feedparser, time

URL = "https://chaeyoung2.tistory.com/rss"
RSS_FEED = feedparser.parse(URL)
MAX_POST = 3

blog_text = ""
markdown_text = """
![header](https://capsule-render.vercel.app/api?type=wave&text=LeeChaeng!&height=250&fontColor=FFF&color=0:FFCEFF,100:ADCDFF&fontAlignY=35&fontSize=100)

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
<!-- <h3>I n t e r e s t i n g..❤️ </h3>
<a href="https://fixed-rubidium-143.notion.site/a5ecc887af2d412589d290957ee8332d?pvs=4" target="_blank"><img src="https://img.shields.io/badge/figma(보러가기)-fd384a?style=flat-square&logo=Figma&logoColor=white"/></a> -->


</div>

<br/>
<br/>

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=chae-young&layout=compact&theme=dark)](https://github.com/anuraghazra/github-readme-stats)

<br/>

<h4>ʟᴀᴛᴇꜱᴛ ʙʟᴏɢ ᴘᴏꜱᴛ</h4>

"""  # list of blog posts will be appended here

for idx, feed in enumerate(RSS_FEED['entries']):
    if idx > MAX_POST:
        break
    else:
        feed_date = feed['published_parsed']
        markdown_text += f"[{time.strftime('%Y/%m/%d', feed_date)} - {feed['title']}]({feed['link']}) <br/>\n"        
f = open("README.md", mode="w", encoding="utf-8")
markdown_text += '![header](https://capsule-render.vercel.app/api?type=wave&height=250&fontColor=FFF&color=0:FFCEFF,100:ADCDFF&section=footer)'
f.write(markdown_text)
f.close()