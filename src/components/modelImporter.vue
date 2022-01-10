<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ this.modelMessage }}</p>
      <div class="gltf">
        <label for="gltf-file">Upload .gltf</label>
        <input type="file" ref="gltf" id="gltf-file" @change="glbfilechange" accept=".glb, .gltf" />
        <span>File Chosen: {{ this.$store.state.gltf }}</span>
      </div>
      <div class="usdz">
        <label for="usdz-file">Upload .usdz</label>
        <input type="file" ref="usdz" id="usdz-file" @change="usdzfilechange" accept=" .usdz" />
        <span>File Chosen: {{ this.$store.state.usdz }}</span>
      </div>
      <button @click="closeModel">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modelMessage"],
  data() {
    return {
      glbfile: null,
      usdzfile: null,
    };
  },
  methods: {
    closeModel() {
      this.$emit("close-model");
    },
    glbfilechange() {
      this.glbfile = this.$refs.gltf.files[0];
      const glbName = this.glbfile.name;
      this.$store.commit("glbChange", glbName);
      this.$store.commit("createGlbURL", URL.createObjectURL(this.glbfile));
    },
    usdzfilechange() {
      this.usdzfile = this.$refs.usdz.files[0];
      const usdzName = this.usdzfile.name;
      this.$store.commit("usdzChange", usdzName);
      this.$store.commit("createUsdzURL", URL.createObjectURL(this.usdzfile));
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
    .gltf {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .usdz {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    input {
      display: none;
    }
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
