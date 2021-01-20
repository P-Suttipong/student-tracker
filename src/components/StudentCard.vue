<template>
  <div>
    <q-dialog v-model="modal" persistent>
      <q-card class="student-card">
        <q-card-section class="row justify-center title">
          <div class="title-icon"><i class="fas fa-users"></i></div>
          <div class="text-h4 card-title">Student Card</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">
          <div class="row justify-between table-title">
            <p class="col-1">ID</p>
            <p class="col-2">Name</p>
            <p class="col-2">MAC Address</p>
            <p class="col-1">Last Status</p>
            <p class="col-2">Parents Phone</p>
          </div>
          <div v-for="n in 12" :key="n">
            <div class="row justify-between table-list q-mt-md">
              <p class="col-1">{{ n }}</p>
              <q-input
                class="col-2 name-input"
                dense
                rounded
                outlined
                v-model="text"
              />
              <q-input
                class="col-2 name-input"
                dense
                rounded
                outlined
                v-model="mac"
              />
              <p class="col-1 q-pl-xl">{{ n }}</p>
              <p class="col-2">{{ n }} 456-123546</p>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn class="cancel-btn" label="ยกเลิก" @click="close" />
          <q-btn class="accept-btn" label="บันทึก" @click="accept" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "student-card",
  props: ["modal"],
  data() {
    return {
      fixed: this.modal,
      text: "N'Tiger",
      mac: "12:34:56:78:90:11"
    };
  },
  methods: {
    close() {
      this.$emit("closeModal");
    },
    accept() {
      this.$emit("closeModal");
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  font-family: "FC_Home";
}
.card-title {
  font-family: "FC_Home";
  color: $greyText;
  font-size: 40px;
}
.title {
  height: 90px;
  width: 80vw;
  z-index: 99;
  background: white;
  position: fixed;
  top: 2vh;
}
.title-icon {
  color: $pink;
  font-size: 30px;
  margin-top: 1px;
  margin-right: 15px;
}
.student-card {
  min-width: 80vw;
  max-height: 80vh;
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
.table-title {
  font-size: 20px;
  font-weight: bold;
}
.table-list {
  font-size: 18px;
}
.name-input {
  margin-top: -10px;
}
</style>
