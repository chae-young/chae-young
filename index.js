import { readFileSync, writeFileSync } from "node:fs";
import Parser from "rss-parser";

const readmePath = "README.md";
let readmeContent = readFileSync(readmePath, "utf8");
const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
});

(async () => {
    const tistoryFeed = await parser.parseURL("https://chaeyoung2.tistory.com/rss");
    // const velogFeed = await parser.parseURL("https://v2.velog.io/rss/@yujin_jeong");

    let tistoryPosts = "### Tistory Latest Blog Posts\n\n";
    for (let i = 0; i < 5 && i < tistoryFeed.items.length; i++) {
        const { title, link } = tistoryFeed.items[i];
        tistoryPosts += `- [${title}](${link})\n`;
    }

    // let velogPosts = "### Velog Latest Blog Posts\n\n";
    // for (let i = 0; i < 5 && i < velogFeed.items.length; i++) {
    //     const { title, link } = velogFeed.items[i];
    //     velogPosts += `- [${title}](${link})\n`;
    // }

    const combinedPosts = `${tistoryPosts}`;
    const newReadmeContent = readmeContent.includes("### Tistory Latest Blog Posts")
        ? readmeContent.replace(/### Tistory Latest Blog Posts[\s\S]*?(?=### Velog Latest Blog Posts|$)/, combinedPosts)
        : readmeContent + "\n" + combinedPosts;

    if (newReadmeContent !== readmeContent) {
        writeFileSync(readmePath, newReadmeContent, "utf8");
        console.log("README.md 업데이트 완료");
    } else {
        console.log("새로운 블로그 포스트가 없습니다.");
    }
})();
