import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsData() {
  //postsディレクトリのファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    //ファイル名(id)を取得するためフゕイル名から".md"を削除する
    const id = fileName.replace(/\.md$/, "");
    //ファイルのメタデータ部分を読み込む
    const fullPath = path.join(postsDirectory, fileName);
    //ファイルの中身を読み込む
    const fileContents = fs.readFileSync(fullPath, "utf8");
    //メタデータ部分を解析するためにmatterを使う
    const matterResult = matter(fileContents);
    //データをidと合わせる
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}

//getStaticPropsで使用するreturnのpathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

//idに基づいてデータを取得する
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const blogContent = await remark().use(html).process(matterResult.content);
  const blogContentHTML = blogContent.toString();
  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
}
