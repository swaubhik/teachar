<template>
  <div>
    <Accordion class="mb-4">
      <template v-slot:title>
        <span class="font-semibold text-xl">Upload Lessons</span>
      </template>
      <template v-slot:content>
        <ol class="list">
          <li>Click "Create Lesson".</li>
          <li>Enter the Lesson Title.</li>
          <li>Upload Cover Photo for the Lesson.</li>
          <li>Write the Lesson content in the rich text editor.</li>
          <li>Upload 3D object in .gltf/.glb format.</li>
          <li>Publish the lesson by clicking the “Publish Lesson”.</li>
        </ol>
      </template>
    </Accordion>
    <Accordion class="mb-4">
      <template v-slot:title>
        <span class="font-semibold text-xl">View Lesson </span>
      </template>
      <template v-slot:content>
        <ol class="list">
          <li>Click "Lessons" in the navigation bar or directly click the lesson card.</li>
          <li>The lessons will open with its content. After opening the lesson the 3D objects will be rendered in the screen.</li>
        </ol>
      </template>
    </Accordion>
    <Accordion class="mb-4">
      <template v-slot:title>
        <span class="font-semibold text-xl">Use AR to view the lesson (Smartphone required)</span>
      </template>
      <template v-slot:content>
        <ol class="list">
          <li>View the lesson</li>
          <li>Click the “AR Mode” button present at the bottom right corner of the 3d viewer.</li>
          <li>Point the camera towards a plane.</li>
          <li>Move the camera slowly for the plane to be detected.</li>
          <li>The 3D objects will be augmented automatically.</li>
          <li>We will be able to move, zoom and rotate the 3D objects using touch.</li>
          <ol class="sub">
            <li>Move: Drag the 3D objects to the desired location.</li>
            <li>Zoom: Use two finger to Scale the 3D object.</li>
            <li>Rotate: Use two finger to Rotate the 3D object.</li>
          </ol>
        </ol>
      </template>
    </Accordion>
  </div>
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
.list {
  list-style: decimal;
  padding: 1rem 2rem;
  margin: 0;
}
.sub {
  list-style-type: lower-alpha;
  padding: 0 2rem;
  margin: 0;
}
ol > li {
  margin-bottom: 0.5rem;
}
.font-semibold {
  font-weight: 600;
}
.mb-4 {
  margin-bottom: 1rem /* 16px */;
}
</style>
