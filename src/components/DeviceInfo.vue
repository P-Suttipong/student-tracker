<template>
  <div>
    <q-dialog v-model="modal" persistent>
      <q-card class="info-card">
        <q-card-section class="row justify-center">
          <div><i class="fas fa-inbox title-icon"></i></div>
          <div class="text-h4 card-title">Device Information</div>
        </q-card-section>

        <q-separator />
        <q-card-section class="scroll">
          <div class="q-mt-md row q-ml-lg">
            <p class="detail col-3">ESP ID :</p>
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
            <p class="detail col-3">Line Key :</p>
            <q-input
              style="width: 250px;"
              class="input"
              dense
              rounded
              outlined
              v-model="line_key"
            />
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <q-btn flat class="cancel-btn" label="ยกเลิก" @click="close()" />
          <q-btn flat class="accept-btn" label="บันทึก" @click="accept()" />
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
      espId: "A8032A699934",
      line_key: ""
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
    if (this.lineKey === "" || this.lineKey === null) {
      this.line_key = "ไม่มี Line Key";
    } else {
      this.line_key = this.lineKey;
    }
  }
};
</script>

<style lang="scss" scoped>
.info-card {
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
  color: $pink;
  font-family: "FC_Home";
  font-size: 18px;
}
.accept-btn {
  color: $blue;
  font-family: "FC_Home";
  font-size: 18px;
}
.input {
  margin-top: -15px;
  margin-left: 15px;
}
.detail {
  font-family: "FC_Home";
  font-size: 24px;
}
</style>
