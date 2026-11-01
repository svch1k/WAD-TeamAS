// Task 4: online endpoint
// const POSTS_URL = "https://api.npoint.io/15388c704e26c0638e35";

// Task 5: local JSON file inside the project
const POSTS_URL = "../resources/json/posts.json";

const feed = document.querySelector(".feed");

// "2026-10-22T11:00:00Z" -> "Oct 22, 2026"
function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function createPost(post) {
  const article = document.createElement("article");
  article.className = "post";

  // header: avatar + date
  const header = document.createElement("header");
  header.className = "post-header";

  const avatar = document.createElement("img");
  avatar.className = "avatar";
  avatar.src = post.author.avatar;
  avatar.alt = post.author.name;
  avatar.title = post.author.name;

  const time = document.createElement("time");
  time.dateTime = post.createTime;
  time.textContent = formatDate(post.createTime);

  header.append(avatar, time);
  article.appendChild(header);

  // optional image
  if (post.image) {
    const img = document.createElement("img");
    img.className = "post-image";
    img.src = post.image;
    img.alt = post.imageAlt || "";
    article.appendChild(img);
  }

  // text (every post has one)
  const text = document.createElement("p");
  text.textContent = post.body;
  article.appendChild(text);

  // like button
  const like = document.createElement("button");
  like.type = "button";
  like.className = "like";
  like.setAttribute("aria-label", "Like");
  like.textContent = "👍";
  article.appendChild(like);

  return article;
}

// Task 4: fetch from the online endpoint 
// fetch("https://api.npoint.io/15388c704e26c0638e35")
//   .then((response) => response.json())
//   .then((posts) => {
//     posts.forEach((post) => feed.appendChild(createPost(post)));
//   })
//   .catch((err) => {
//     const errDiv = document.createElement("div");
//     errDiv.className = "post";
//     errDiv.textContent = "Could not load posts: " + err;
//     feed.appendChild(errDiv);
//   });

// fetch from the local JSON file 
fetch(POSTS_URL)
  .then((response) => {
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
  })
  .then((posts) => {
    posts.forEach((post) => feed.appendChild(createPost(post)));
  })
  .catch((err) => {
    const errDiv = document.createElement("div");
    errDiv.className = "post";
    errDiv.textContent = "Could not load posts: " + err;
    feed.appendChild(errDiv);
  });
