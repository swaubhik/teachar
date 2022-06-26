<template>
  <Accordion class="mb-4">
    <template v-slot:title>
      <span class="font-semibold text-xl">Upload Lessons</span>
    </template>
    <template v-slot:content>
      <summary></summary>
      <ol>
        <li>Click “Create Lesson”.</li>
        <li>Enter the Lesson Title.</li>
        <li>Upload Cover Photo for the Lesson.</li>
        <li>Write the Lesson content in the rich text editor.</li>
        <li>Upload 3D object in .gltf/.glb format.</li>
        <li>Publish the lesson by clicking the “Publish Lesson”.</li>
      </ol>
    </template>
  </Accordion>
</template>

<script>
import Accordion from "./Accordion.vue";

export default {
  name: "App",
  components: {
    Accordion,
  },
};
</script>
<style scoped>
.mb-4 {
  margin-bottom: 2rem /* 16px */;
}
.font-semibold {
  font-weight: 600;
}
.mb-4 {
  margin-bottom: 1rem /* 16px */;
}
</style>
