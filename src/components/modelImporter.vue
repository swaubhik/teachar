<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ this.modelMessage }}</p>
      <button @click="uploadgltf">Upload GLTF file</button>
      <button @click="uploadusdz">Upload USDZ file</button>
      <button @click="closeModel">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modelMessage"],
  methods: {
    closeModel() {
      this.$emit("close-model");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 8px;
    width: 500px;
    height: 300px;
    padding: 40px 30px;
    background-color: #fff;

    p {
      text-align: center;
    }

    button {
      align-self: center;
    }
  }
}
</style>
