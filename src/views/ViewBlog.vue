<!-- <template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog[0].blogTitle }}</h2>
      <h4>Posted on: {{ new Date(this.currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
      <img :src="this.currentBlog[0].blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="this.currentBlog[0].blogHTML"></div>
    </div>
  </div>
</template> -->
<template>
  <div class="sample" v-if="currentBlog">
    <div class="demo" id="ar">
      <model-viewer :src="this.currentBlog[0].lessongltf" camera-controls auto-rotate ar> </model-viewer>
    </div>
    <div class="content">
      <div class="wrapper">
        <div class="heading1">
          <h2 class="demo-title">{{ this.currentBlog[0].blogTitle }}</h2>
          <h4>Posted on: {{ new Date(this.currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
          <img :src="this.currentBlog[0].blogCoverPhoto" alt="" />
          <div class="post-content ql-editor" v-html="this.currentBlog[0].blogHTML"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: null,
    };
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.$route.params.blogid;
    });
  },
};
</script>

<style scoped>
.ql-editor >>> img {
  width: 100%;
  height: auto;
}
:root {
  --color-red: #ff5252;
  --font-monospace: "Roboto Mono", monospace;
  --border-style: 1px solid rgba(0, 0, 0, 0.15);
  --grouping-title-margin-top: 40px;
  --snippet-offset: 20px -20px;
  --pre-padding: 16px 20px;
  --demo-title-padding: 24px 10% 24px 0;
  --heading1-h1-margin-top: 40px;
  --browser-support-desc-margin-top: 40px;
  --browser-support-icons-margin-top: 16px;
  --button-size: 36px;
  --icon-size: 28px;
  --header-height: 72px;
  --toggle-visibility: hidden;
  --og-sidebar-width: 300px;
  --neg-sidebar-width: 0px;
  --sidebar-width: 300px;
  --sidebar-speed: 0.15s;
  --border-style-dark: 1px solid rgba(0, 0, 0, 0.5);
}
body {
  font-family: Rubik, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
  margin: 0;
  padding: 0;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
* {
  box-sizing: border-box;
}
a {
  cursor: pointer;
  text-decoration: none;
  color: var(--color-red);
}
h1 {
  white-space: nowrap;
  font-size: 1.92em;
  line-height: 1.24em;
  margin-bottom: 0.12em;
  margin-top: 0;
}
h3 {
  font-size: 1.4em;
  line-height: 1.34em;
  margin-top: 0.12em;
  margin-bottom: 0.12em;
}
h4 {
  font-size: 1.2em;
  line-height: 1.4em;
  margin-top: 0.1em;
  margin-bottom: 0.1em;
}
h1 span {
  display: inline-block;
  transform: translate3d(0, 3px, 0);
}
p {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  max-width: 680px;
}
model-viewer:focus {
  outline: 0;
}
.sample {
  display: grid;
  position: relative;
  background: #fff;
  grid-template-columns: 50% 50%;
  grid-template-areas: "content demo";
}
.sample {
  border-bottom: var(--border-style);
}
.demo {
  grid-area: demo;
  position: sticky;
  top: 0;
  height: 100vh;
  flex: 1;
  display: flex;
  justify-content: center;
  border: 0 solid #555;
  box-sizing: border-box;
}
.sample > .demo {
  height: 100vh;
}
.demo-title {
  padding: var(--demo-title-padding);
}
/* .demo-title:before {
  background: #222;
  height: 2px;
  width: 40px;
  content: "";
  display: block;
  margin-bottom: 16px;
} */
.demo-title + h4,
h4 + h4 {
  margin-top: 20px;
  margin-bottom: 40px;
}
.icon-button {
  width: var(--button-size);
  height: var(--button-size);
  background-repeat: no-repeat;
  display: inline-block;
  background-size: var(--icon-size);
  cursor: pointer;
  background-position: 50% 50%;
  opacity: 0.87;
}
.icon-button:hover {
  opacity: 1;
}
.demo model-viewer {
  width: 100%;
  height: 100%;
  background-color: #eee;
}
.content {
  grid-area: content;
  position: relative;
  padding-top: 20px;
}
.wrapper {
  margin: 0 auto;
  padding: 40px 60px;
  position: relative;
  max-width: 920px;
}
.heading1 {
  max-width: 760px;
}
@media only screen and (min-width: 1664px) {
  :root {
    --snippet-offset: 40px -40px;
    --pre-padding: 28px 40px;
  }
  body {
    font-size: 18px;
    line-height: 26px;
  }
}
@media only screen and (max-width: 1280px) {
  .wrapper {
    margin: 0 20px;
    padding: 20px;
    min-height: auto;
    border-bottom: none;
  }
}
@media only screen and (max-width: 800px) {
  :root {
    --grouping-title-margin-top: 20px;
    --demo-title-padding: 8px 12px 24px 0;
    --snippet-offset: 0;
    --heading1-h1-margin-top: 0;
    --browser-support-desc-margin-top: 20px;
    --browser-support-icons-margin-top: 8px;
    --header-height: 56px;
    --sidebar-width: 0;
    --overlay-width: 0;
  }
  .sample > .demo {
    top: 0;
    height: 150vw;
  }
  body {
    font-size: 14px;
    line-height: 22px;
  }
  h1 {
    font-size: 1.8em;
    line-height: 1.4em;
  }
  h2 {
    font-size: 1.56em;
    line-height: 1.36em;
  }
  h3 {
    font-size: 1.2em;
    line-height: 1.48em;
    font-weight: 500;
  }
  h4 {
    font-size: 1em;
    line-height: 1.5em;
  }
  .demo-title + h4 {
    margin-bottom: 20px;
  }
  .wrapper {
    padding: 0 0 20px 0;
  }
  .demo {
    position: relative;
    flex-direction: column-reverse;
    background-color: #455a64;
  }
  .sample {
    display: block;
  }
  .content {
    max-width: unset;
    padding-top: 16px;
  }
}
h2 {
  margin-bottom: 16px;
  font-weight: 300;
  font-size: 32px;
}
img {
  width: 100%;
  margin-bottom: 32px;
}
.ql-editor {
  padding: 0;
}
h4 {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 24px;
}
</style>
