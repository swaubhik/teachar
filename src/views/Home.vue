<template>
  <div class="home">
    <LessonPost :post="welcomeScreen" />
    <LessonPost :post="post" v-for="(post, index) in sampleLesson" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Lessons</h3>
        <div class="blog-cards">
          <LessonCard :post="post" v-for="(post, index) in lessonPostsCards" :key="index" />
        </div>
      </div>
    </div>
    <div class="updates">
      <div class="container">
        <h2>Never miss a Lesson. Register to start Learning!</h2>
        <router-link class="router-button" to="#"> Register Now! <Arrow class="arrow arrow-light" /> </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
import LessonCard from "../components/LessonCard.vue";
import LessonPost from "../components/LessonPost.vue";
export default {
  name: "Home",
  components: { LessonPost, LessonCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        lessonPost: "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleLesson: [
        {
          title: "lorem ipsum",
          lessonHTML: "hero",
          lessonCoverPhoto: "beautiful-stories",
        },
        {
          title: "lorem ipsum2",
          lessonHTML: "heroalomff",
          lessonCoverPhoto: "designed-for-everyone",
        },
      ],
    };
  },
  computed: {
    lessonPostsCards() {
      return this.$store.state.lessonPostsCards;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
