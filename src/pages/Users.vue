<template>
  <q-scroll-area
    style="height: 100vh;"
    class=" flex items-start justify-center"
  >
    <div class="column flex flex-center">
      <div class="top column flex flex-center">
        <h2>ผู้ใช้งาน</h2>
        <div class="row">
          <q-input
            class="search"
            dense
            rounded
            v-model="userID"
            label="Serach By ID"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon
                v-if="userID !== ''"
                name="close"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <q-btn class="add-btn-2"><i class="fas fa-search"></i></q-btn>
          <q-btn @click="openAddModal" class="add-btn-2"
            ><i class="fas fa-plus"></i
          ></q-btn>
        </div>
      </div>
      <div class="table">
        <div v-if="isLoading" class="row justify-center q-mb-md">
          <q-spinner class="spinner" size="3em" :thickness="5" />
        </div>
        <div v-else>
          <UserCard :topic="true" :user="userTopic"></UserCard>
          <div v-for="item in userList" :key="item.id">
            <UserCard :topic="false" :user="item"></UserCard>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="addModal">
      <q-card class="dialog-card">
        <div>
          <q-input
            v-model="username"
            class="add-input"
            outlined
            label="ชื่อผู้ใช้"
          />
          <q-input
            type="password"
            v-model="password"
            class="add-input"
            outlined
            label="รหัสผ่าน"
          />
          <q-input
            type="password"
            v-model="confirmPassword"
            class="add-input"
            outlined
            label="ยืนยันรหัสผ่าน"
          />
          <q-input
            v-model="firstname"
            class="add-input"
            outlined
            label="ชื่อ"
          />
          <q-input
            v-model="lastname"
            class="add-input"
            outlined
            label="นามสกุล"
          />
          <q-input
            v-model="phone"
            class="add-input"
            outlined
            label="เบอร์โทร"
            mask="###-###-####"
          />
          <q-input
            v-model="device_id"
            class="add-input"
            outlined
            label="Device ID"
          />
          <div class="row justify-center">
            <q-btn @click="confirmAdd" class="add-btn">เพิ่ม</q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="errorModal">
      <q-card class="error-modal">
        <q-card-section>
          <p class="text-h5">แจ้งเตือน</p>
        </q-card-section>
        <q-separator />
        <q-card-section class="row justify-center">
          <p class="text-h6">{{ errorMessage }}</p>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            flat
            class="cancel-btn"
            label="ปิด"
            @click="errorModal = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-scroll-area>
</template>

<script>
import UserCard from "../components/UserCard";
import { mapState } from "vuex";
export default {
  name: "users",
  components: { UserCard },
  data() {
    return {
      userID: "",
      addModal: false,
      isLoading: false,
      username: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      phone: "",
      device_id: "",
      errorModal: false,
      errorMessage: "",
      userTopic: {
        username: "Username",
        firstname: "Name",
        lastname: "",
        phone: "Phone",
        device_id: "Device ID"
      }
    };
  },
  computed: {
    ...mapState({
      userList: state => state.school.userList
    })
  },
  methods: {
    openAddModal() {
      this.addModal = true;
    },
    async confirmAdd() {
      if (
        (this.username == "") |
        (this.password == "") |
        (this.firstname == "") |
        (this.lastname == "") |
        (this.phone == "") |
        (this.device_id == "")
      ) {
        this.errorModal = true;
        this.errorMessage = "กรุณากรอกข้อมูลให้ครบ";
      } else if (this.password !== this.confirmPassword) {
        this.errorModal = true;
        this.errorMessage = "รหัสผ่านไม่ตรงกัน";
      } else {
        let res = await this.$store.dispatch("addUser", {
          username: this.username,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          phone: this.phone,
          device_id: this.device_id
        });
        console.log(res);
        if (res) {
          this.errorModal = true;
          this.errorMessage = "เพิ่มผู้ใช้สำเร็จ";
        } else {
          this.errorModal = true;
          this.errorMessage = "เพิ่มผู้ใช้ไม่สำเร็จ";
        }
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.firstname = "";
        this.lastname = "";
        this.phone = "";
        this.device_id = "";
      }
    }
  },
  mounted() {
    this.$store.dispatch("getUserList");
  }
};
</script>

<style lang="scss" scoped>
p {
  font-family: "FC_Home";
}
.dialog-card {
  padding: 20px 20px 20px 20px;
}
.add-input {
  width: 300px;
  margin-bottom: 10px;
}
.error-modal {
  width: 400px;
}
.cancel-btn {
  color: $pink;
  font-family: "FC_Home";
  font-size: 18px;
}
</style>
