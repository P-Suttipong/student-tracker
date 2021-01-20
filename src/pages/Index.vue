<template>
  <q-scroll-area
    style="height: 100vh;"
    class=" flex items-start justify-center"
  >
    <div></div>
    <div class="column flex flex-center">
      <div class="top column flex flex-center">
        <h2>ข้อมูลยานพาหนะ</h2>
        <div class="row">
          <q-input
            @input="searchVehicle(vehicleID)"
            class="search"
            dense
            rounded
            v-model="vehicleID"
            label="Serach By ID"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon
                v-if="vehicleID !== ''"
                name="close"
                @click="fetchVehicles()"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <q-btn @click="searchByAPI()" class="add-btn-2"
            ><i class="fas fa-search"></i
          ></q-btn>
          <!-- <q-btn @click="openAddModal()" class="add-btn-2"
            ><i class="fas fa-plus"></i
          ></q-btn> -->
        </div>

        <div class="row justify-end">
          <p @click="prevPage" class="pagination-icon">
            <i class="fas fa-chevron-circle-left"></i>
          </p>
          <p class="page-number">Page : {{ pageNumber }}</p>
          <p @click="nextPage" class="pagination-icon">
            <i class="fas fa-chevron-circle-right"></i>
          </p>
        </div>
      </div>
      <div class="table">
        <div v-if="isLoading" class="row justify-center q-mb-md">
          <q-spinner class="spinner" size="3em" :thickness="5" />
        </div>
        <div v-else v-for="item in vehiclesShowList" :key="item.id">
          <VehicleCard
            @openModal="studentModal = true"
            @openInfoModal="infoModal = true"
            @lineKey="deviceInfoLineKey"
            :vehicle="item"
          ></VehicleCard>
        </div>
        <p class="error-text" v-if="showErrorMessage">
          ไม่พบข้อมูลที่ท่านต้องการ
        </p>
      </div>
      <!-- <q-btn class="add-btn"><i class="fas fa-plus"></i></q-btn> -->
    </div>
    <q-dialog v-model="addModal">
      <q-card class="dialog-card">
        <div>
          <q-input class="add-input" outlined label="ชื่อ" />
          <q-input class="add-input" outlined label="ป้ายทะเบียน" />
          <q-input class="add-input" outlined label="จังหวัด" />
          <q-input class="add-input" outlined label="ประเภท" />
          <q-input class="add-input" outlined label="Device ID" />
          <div class="row justify-center">
            <q-btn class="add-btn">เพิ่ม</q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <StudentCard
      @closeModal="studentModal = false"
      :modal="studentModal"
    ></StudentCard>
    <DeviceInfo
      @closeModal="infoModal = false"
      :lineKey="lineKey"
      :modal="infoModal"
    ></DeviceInfo>
  </q-scroll-area>
</template>

<script>
import vue from "vue";
import VehicleCard from "../components/VehicleCard";
import BaseMap from "../components/BaseMap";
import { Quasar, QScrollArea } from "quasar";
import StudentCard from "../components/StudentCard";
import { mapState } from "vuex";
import DeviceInfo from "../components/DeviceInfo";
export default {
  name: "vehicles",
  components: { VehicleCard, BaseMap, QScrollArea, StudentCard, DeviceInfo },
  data() {
    return {
      addModal: false,
      studentModal: false,
      infoModal: false,
      pageNumber: 1,
      vehicleID: "",
      vehiclesShowList: [],
      isLoading: false,
      showErrorMessage: false,
      lineKey: ""
    };
  },
  computed: {
    ...mapState({
      vehiclesList: state => state.school.vehiclesList,
      vehiclesSearch: state => state.school.vehiclesSearch
    })
  },
  methods: {
    async searchByAPI() {
      await this.$store.dispatch("searchVehicleByID", this.vehicleID);
      console.log(this.vehiclesSearch);
      this.vehiclesShowList = this.vehiclesSearch;
    },
    searchVehicle(vehicleID) {
      this.isLoading = true;
      if (vehicleID !== "") {
        this.vehiclesShowList = [];
        // let result = this.vehiclesList.filter(
        //   vehicle => vehicle.id === vehicleID
        // );
        let result = this.vehiclesList.map(vh => {
          let arrID = vh.id.split("");
          if (vehicleID.length === 1) {
            if (vehicleID === arrID[0]) {
              return vh;
            }
          } else if (vehicleID.length === 2) {
            if (vehicleID === arrID[0] + arrID[1]) {
              return vh;
            }
          } else if (vehicleID.length === 3) {
            if (vehicleID === arrID[0] + arrID[1] + arrID[2]) {
              return vh;
            }
          } else if (vehicleID.length === 4) {
            if (vehicleID === arrID[0] + arrID[1] + arrID[2] + arrID[3]) {
              return vh;
            }
          } else if (vehicleID.length === 5) {
            if (
              vehicleID ===
              arrID[0] + arrID[1] + arrID[2] + arrID[3] + arrID[4]
            ) {
              return vh;
            }
          }
        });
        result.map(res => {
          if (res !== undefined) {
            this.vehiclesShowList.push(res);
          }
        });
      } else {
        this.vehiclesShowList = this.vehiclesList;
      }
      this.isLoading = false;
    },
    async fetchVehicles() {
      this.vehicleID = "";
      await this.$store.dispatch("getVehiclesList", {
        page: this.pageNumber,
        size: 10
      });
      this.vehiclesShowList = this.vehiclesList;
    },
    async openAddModal() {
      this.addModal = true;
    },
    prevPage() {
      if (this.pageNumber !== 1) {
        this.pageNumber = this.pageNumber - 1;
      }
      this.getVehiclesList();
    },
    nextPage() {
      this.pageNumber = this.pageNumber + 1;
      this.getVehiclesList();
    },
    async getVehiclesList() {
      this.isLoading = true;
      this.showErrorMessage = false;
      await this.$store.dispatch("getVehiclesList", {
        page: this.pageNumber,
        size: 10
      });
      if (this.vehiclesList.length > 0) {
        this.vehiclesShowList = this.vehiclesList;
        this.showErrorMessage = false;
      } else {
        this.showErrorMessage = true;
        this.vehiclesShowList = [];
      }
      this.isLoading = false;
    },
    deviceInfoLineKey(key) {
      console.log("Line Key : ", key);
      this.lineKey = key;
    }
  },
  async beforeMount() {
    this.getVehiclesList();
  }
};
</script>
<style lang="scss" scoped>
h2 {
  font-family: "FC_Home";
  color: $greyText;
}

.top {
  height: 280px;
  width: 100vw;
  margin-top: -50px;
  z-index: 99;
  background: white;
  position: fixed;
  top: 0;
}

.table {
  margin-top: 230px;
}

.search {
  width: 250px;
  font-family: "FC_Home";
  font-size: 22px;
  padding: 1px 30px 5px 30px;
  border-radius: 50px;
  border: 3px solid $pink;
  margin-top: -30px;
  margin-bottom: 30px;
}
.add-btn {
  background-color: $pink;
  color: white;
  border-radius: 50px;
  width: 80px;
  height: 50px;
  font-size: 20px;
  font-family: "FC_Home";
}
.add-btn-2 {
  margin-top: -30px;
  margin-left: 10px;
  background-color: $pink;
  color: white;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  font-size: 20px;
}

.dialog-card {
  padding: 20px 20px 20px 20px;
}

.add-input {
  width: 300px;
  margin-bottom: 10px;
}

.pagination-icon {
  font-size: 20px;
  color: $pink;
}

.page-number {
  color: $greyText;
  font-family: "FC_Home";
  margin-top: -2px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 20px;
}
.spinner {
  color: $blue;
}
.error-text {
  color: $greyText;
  font-family: "FC_Home";
  font-size: 24px;
}
</style>
