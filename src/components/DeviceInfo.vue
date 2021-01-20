<template>
  <div>
    <q-dialog v-model="modal" persistent>
      <q-card class="card">
        <q-card-section class="row justify-center">
          <div><i class="fas fa-inbox title-icon"></i></div>
          <div class="text-h4 card-title">Device Information</div>
        </q-card-section>

        <q-separator />
        <q-card-section class="scroll">
          <div class="q-mt-md row q-ml-lg">
            <p class="col-2">ESP ID :</p>
            <q-input
              style="width: 130px;"
              class="col-5 input"
              dense
              rounded
              outlined
              v-model="espId"
            />
          </div>
          <div class="q-mt-sm q-ml-lg row">
            <p class="col-2">Line Key :</p>
            <q-input
              style="width: 250px;"
              class="input"
              dense
              rounded
              outlined
              v-model="espId"
            />
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <q-btn class="cancel-btn" label="ยกเลิก" @click="close()" />
          <q-btn class="accept-btn" label="บันทึก" @click="accept()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "device-info-modal",
  props: ["modal", "lineKey"],
  data() {
    return {
      espId: "A8032A699934"
    };
  },
  methods: {
    close() {
      this.$emit("closeModal");
    },
    accept() {
      this.$emit("closeModal");
    }
  },
  mounted() {
    console.log(this.lineKey);
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 500px;
  height: auto;
}
.card-title {
  font-family: "FC_Home";
  color: $greyText;
  font-size: 40px;
}
.title-icon {
  color: $pink;
  font-size: 30px;
  margin-top: 8px;
  margin-right: 15px;
}
.cancel-btn {
  background-color: $pink;
  color: white;
  font-family: "FC_Home";
  font-size: 18px;
}
.accept-btn {
  background-color: $blue;
  color: white;
  font-family: "FC_Home";
  font-size: 18px;
}
.input {
  margin-top: -15px;
  margin-left: 15px;
}
</style>
