<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Lessons Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">Preview Photo</button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          placeholder="Write your Lesson content here..."
          v-model="blogHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>

      <div class="model">
        <div class="gltf">
          <label for="gltf-file">Upload .gltf</label>
          <input type="file" ref="gltf" id="gltf-file" @change="gltffileChange" accept=".glb, .gltf" />
          <span>File Chosen: {{ this.$store.state.gltfName }}</span>
        </div>
        <div class="usdz">
          <label for="usdz-file">Upload .usdz</label>
          <input type="file" ref="usdz" id="usdz-file" @change="usdzfileChange" accept=" .usdz" />
          <span>File Chosen: {{ this.$store.state.usdzName }}</span>
        </div>
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Lesson</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Lesson Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCoverPreview from "../components/BlogCoverPreview";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "CreateLessons",
  data() {
    return {
      file: null,
      gltffile: null,
      usdzfile: null,
      error: null,
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  components: {
    BlogCoverPreview,
    Loading,
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
    },
    gltffileChange() {
      this.gltffile = this.$refs.gltf.files[0];
      const gltfName = this.gltffile.name;
      this.$store.commit("gltfNameChange", gltfName);
      this.$store.commit("creategltfModelFileURL", URL.createObjectURL(this.gltffile));
    },
    usdzfileChange() {
      this.usdzfile = this.$refs.usdz.files[0];
      const usdzName = this.usdzfile.name;
      this.$store.commit("usdzNameChange", usdzName);
      this.$store.commit("createUsdzModelFileURL", URL.createObjectURL(this.usdzfile));
    },

    openPreview() {
      this.$store.commit("openPhotoPreview");
    },

    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
      docRef.put(file).on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },

    uploadBlog() {
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.file) {
          if (this.gltffile && this.usdzfile) {
            this.loading = true;
            const storageRef = firebase.storage().ref();
            const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`);
            // const gltfRef = storageRef.child(`documents/LessonGLTFfiles/${this.$store.state.gltf}`);
            // const usdzRef = storageRef.child(`documents/LessonUSDZfiles/${this.$store.state.usdz}`);
            // gltfRef.put(this.gltffile).on(
            //   "state_changed",
            //   (snapshot) => {
            //     console.log(snapshot);
            //   },
            //   (err) => {
            //     console.log(err);
            //     this.loading = false;
            //   }
            // );
            // usdzRef.put(this.usdzfile).on(
            //   "state_changed",
            //   (snapshot) => {
            //     console.log(snapshot);
            //   },
            //   (err) => {
            //     console.log(err);
            //     this.loading = true;
            //   }
            // );
            docRef.put(this.file).on(
              "state_changed",
              (snapshot) => {
                console.log(snapshot);
              },
              (err) => {
                console.log(err);
                this.loading = false;
              },

              async () => {
                const downloadURL = await docRef.getDownloadURL();
                const timestamp = await Date.now();
                const dataBase = await db.collection("blogPosts").doc();
                await dataBase.set({
                  blogID: dataBase.id,
                  blogHTML: this.blogHTML,
                  blogCoverPhoto: downloadURL,
                  gltfFile: "",
                  usdzFile: "",
                  gltfFileName: "",
                  usdzFileName: "",
                  blogCoverPhotoName: this.blogCoverPhotoName,
                  blogTitle: this.blogTitle,
                  profileId: this.profileId,
                  date: timestamp,
                });

                console.log("Document written with ID: ", dataBase.id);
                const id = dataBase.id
                const gltfRef = storageRef.child(`documents/LessonGLTFfiles/${this.$store.state.gltfName}`);
                gltfRef.put(this.gltffile).on(
                  "state_changed",
                  (snapshot) => {
                    console.log(snapshot);
                  },
                  (err) => {
                    console.log(err);
                    this.loading = false;
                  },
                  async () => {
                    const dataBase = await db.collection("blogPosts").doc(id);
                    const gltfdownloadURL = await gltfRef.getDownloadURL();
                    await dataBase.update({
                      gltfFile: gltfdownloadURL,
                      gltfFileName: this.gltfFileName,
                    });
                  }
                );

                await this.$store.dispatch("getPost");
                this.loading = false;
                this.$router.push({ name: "ViewBlog", params: { blogid: dataBase.id } });
              }
            );

            const usdzRef = storageRef.child(`documents/LessonUSDZfiles/${this.$store.state.usdzName}`);

            usdzRef.put(this.usdzfile).on(
              "state_changed",
              (snapshot) => {
                console.log(snapshot);
              },
              (err) => {
                console.log(err);
                this.loading = true;
              },
              async () => {
                const dataBase = await db.collection("blogPosts").doc();
                const usdzdownloadURL = await usdzRef.getDownloadURL();
                await dataBase.update({
                  usdzFile: usdzdownloadURL,
                  usdzFileName: this.usdzFileName,
                });
              }
            );
            return;
          } else {
            this.error = true;
            this.errorMsg = "Please ensure you uploaded a 3D model in both formats!";
            this.$store.state.setTimeout(() => {
              this.error = false;
            }, 5000);
            return;
          }
        }
        this.error = true;
        this.errorMsg = "Please ensure you uploaded a cover photo!";
        this.$store.state.setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      this.error = true;
      this.errorMsg = "Please ensure Lesson Title & Lesson Post has been filled!";
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    gltfFileName() {
      return this.$store.state.gltfName;
    },
    usdzFileName() {
      return this.$store.state.usdzName;
    },

    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload);
      },
    },
  },
};
</script>
<style lang="scss">
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .upload {
    margin-top: 32px;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    .model {
      padding: 32px 0 0 0;
      .gltf {
        display: flex;
        align-items: center;
        span {
          font-size: 12px;
          margin-left: 16px;
          align-self: center;
        }
      }
      input {
        display: none;
      }
      .usdz {
        margin: 32px 0 0 0;
        display: flex;
        align-items: center;
        span {
          font-size: 12px;
          margin-left: 16px;
          align-self: center;
        }
      }
    }
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  // error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 300px;
    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .blog-actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }
}
</style>
