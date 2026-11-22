# WAD-TeamAS — PostIt (Homework 3)

A small social feed ("PostIt") built with **Vue 3 + Vuex + Vite**. It was
migrated from the static HTML/CSS/JS version of the previous homework, which is
kept untouched in [`../old_copy`](../old_copy) for reference.

## Pages

| Route         | View                      | Purpose                                   |
| ------------- | ------------------------- | ----------------------------------------- |
| `/#/`         | `views/HomeView.vue`      | main page with the feed (10 posts)        |
| `/#/signup`   | `views/SignupView.vue`    | signup page with the password validation  |
| `/#/add-post` | `views/AddPostView.vue`   | add post page carried over from HW1/HW2   |

The old `.html` URLs are kept as redirects (`#/index.html` → main,
`#/login.html` → signup, `#/addPost.html` → add post), so old links keep
working. Hash-based routing is used on purpose: the project is published to
GitHub Pages, where a web-history route such as `/signup` would return 404 on a
page reload.

## How the homework tasks map to the code

1. **Two pages** — main feed (`HomeView`) with 10 posts and the signup page
   (`SignupView`); both share header and footer through `App.vue`.
2. **Header component** — `components/AppHeader.vue`, rendered on every page,
   with `RouterLink` navigation to Home and Signup (plus Add Post). The current
   page is marked with `aria-current="page"` automatically.
3. **Footer component** — `components/AppFooter.vue` with the copyright line,
   rendered on every page.
4. **Main page and likes** — the feed and everything it shows comes from the
   Vuex store in `src/store/index.js`:
   - `fetchPosts` action loads `public/data/posts.json` with the Fetch API;
   - `PostCard.vue` receives only a `postId` and asks the store for the post
     (`postById` getter), so a post never holds its own copy of the data;
   - `likePost` action increments `likes` in the store (Task 4.2), the counter
     next to the 👍 button shows the value;
   - `resetAllLikes` action sets every counter back to zero (Task 4.3), wired to
     the “Reset likes” button under the feed.
5. **Signup form** — `SignupView.vue` contains the Email field, the Password
   field and the Signup button, as in the homework figure.
6. **Password validation** — the rules are declared in `SignupView.vue` as a
   list of `{ label, test }` objects: 8–14 characters, at least one uppercase
   letter, at least two lowercase letters, at least one digit, must start with
   an uppercase letter and must contain `_`. While typing (and on submit) the
   form shows `the password is not valid - <rules that are not satisfied>`.
   A valid password returns to the feed.
7. **Styling** — every component keeps its own CSS in a `<style scoped>` block
   at the bottom of its `.vue` file. Global styles (CSS variables, `body`,
   form controls) live in an unscoped `<style>` block in `App.vue`. The only
   separate stylesheet is `src/css/normalize.css`, imported first in
   `src/main.js`.

## Project structure

```
public/
  data/posts.json        feed data, fetched by the Vuex store
  images/                avatar and post images
src/
  components/            AppHeader, AppFooter, UserMenu, AvatarLogo, PostCard
  css/normalize.css      the only global stylesheet (other CSS is in .vue files)
  router/index.js        routes and legacy redirects
  store/index.js         Vuex store: posts, loading state, likes
  views/                 HomeView, SignupView, AddPostView
  App.vue                page shell: header, <RouterView>, footer
```

## Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production build

```sh
npm run build
```

`dist/` is then ready to be published (for GitHub Pages only the contents of
`dist/` have to be deployed).

> Note: `npm run lint` currently fails because no `eslint.config.js` (ESLint 9
> flat config) is committed. The ESLint dependencies are installed, but the
> config and `eslint-plugin-vue` still have to be added.
