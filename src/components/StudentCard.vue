<template>
  <div>
    <q-dialog v-model="modal" persistent>
      <q-card class="student-card">
        <q-card-section class="row justify-center title">
          <div class="title-icon"><i class="fas fa-users"></i></div>
          <div class="text-h4 card-title">Student Card</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll student-list list-background">
          <div class="row justify-between table-title">
            <p class="col-2">Name</p>
            <p class="col-2">MAC Address</p>
            <p class="col-2">Last Status</p>
            <p class="col-2">Parents Phone</p>
            <p class="col-2">Gender</p>
            <p class="col-1"></p>
          </div>
          <div v-for="std in students" :key="std.id">
            <div class="row justify-between table-list q-mt-md">
              <p class="col-2">{{ std.name }}</p>
              <p class="col-2">{{ std.mac }}</p>
              <p class="col-2 q-pl-lg">
                <i
                  :class="iconStatusClass(std.last_status)"
                  class="fas fa-circle"
                ></i>
              </p>
              <p class="col-2">{{ std.parents_phone }}</p>
              <p class="col-2">
                {{ std.gender }}
              </p>
              <q-btn
                @click="
                  openUpdateModal(
                    std.id,
                    std.name,
                    std.parents_phone,
                    std.gender
                  )
                "
                class="col-1 save-btn"
                rounded
                ><p>แก้ไข</p></q-btn
              >
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions style="margin-right: 80px" align="right">
          <!-- <q-btn class="accept-btn" dense label="เพิ่ม" @click="accept" /> -->
          <q-btn flat class="cancel-btn" label="ปิด" @click="close" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="openModal" persistent>
      <q-card class="update-card">
        <q-card-section>
          <p class="text-h5">แก้ไข</p>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <p class="col-4 text-h6">Name:</p>
            <q-input
              class="update-input"
              style="width: 250px;"
              dense
              rounded
              outlined
              v-model="nameUpdate"
            />
          </div>
          <div class="row">
            <p class="col-4 text-h6">Gender:</p>
            <q-select
              class="update-input"
              style="width: 250px;"
              dense
              rounded
              outlined
              :options="options"
              v-model="genderUpdate"
            />
          </div>
          <div class="row">
            <p class="col-4 text-h6">Parents Phone:</p>
            <q-input
              class="update-input"
              style="width: 250px;"
              dense
              rounded
              outlined
              mask="###-###-####"
              v-model="phoneUpdate"
            />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            flat
            class="accept-btn"
            dense
            label="บันทึก"
            @click="acceptUpdate()"
          />
          <q-btn
            flat
            class="cancel-btn"
            label="ปิด"
            @click="openModal = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Quasar, QToggle } from "quasar";
export default {
  name: "student-card",
  props: ["modal", "id"],
  components: { QToggle },
  data() {
    return {
      fixed: this.modal,
      value: false,
      openModal: false,
      nameUpdate: "",
      phoneUpdate: "",
      idUpdate: "",
      genderUpdate: "",
      options: ["male", "female"]
    };
  },
  computed: {
    ...mapState({
      students: state => state.school.studentList
    })
  },
  methods: {
    names(name) {
      return name;
    },
    close() {
      this.$emit("closeModal");
    },
    accept() {
      this.$emit("closeModal");
    },
    acceptUpdate() {
      this.openModal = false;
      this.$store.dispatch("updateBeacon", {
        device_id: this.id,
        beacon_id: this.idUpdate,
        name: this.nameUpdate,
        parents_phone: this.phoneUpdate,
        gender: this.genderUpdate
      });
    },
    iconStatusClass(last) {
      if (last == "N") {
        return "active-status";
      } else {
        return "deactive-status";
      }
    },
    openUpdateModal(id, name, phone, gender) {
      console.log(this.id);
      console.log(id);
      console.log(name);
      console.log(phone);
      console.log(gender);
      this.nameUpdate = name;
      this.phoneUpdate = phone;
      this.idUpdate = id;
      this.genderUpdate = gender;
      this.openModal = true;
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
.title-icon {
  color: $pink;
  font-size: 30px;
  margin-top: 1px;
  margin-right: 15px;
}
.student-card {
  min-width: 50vw;
  max-height: 80vh;
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
.student-list {
  margin-left: 60px;
  margin-right: 60px;
}
.save-btn {
  margin-top: -5px;
  height: 40px;
  font-family: "FC_Home";
  font-size: 18px;
  background: $blue;
  color: white;
}
.delete-btn {
  margin-top: -5px;
  height: 40px;
  font-family: "FC_Home";
  font-size: 18px;
  background: $pink;
  color: white;
}
.active-status {
  color: $blue;
}
.deactive-status {
  color: $greyText;
}
.update-card {
  width: 450px;
}
.update-input {
  margin-top: -10px;
  margin-left: 10px;
}
</style>
