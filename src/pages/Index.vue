<template>
  <q-scroll-area
    style="height: 100vh;"
    class=" flex items-start justify-center"
  >
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
          <q-btn @click="openAddModal()" class="add-btn-2"
            ><i class="fas fa-plus"></i
          ></q-btn>
        </div>
      </div>
      <div class="table">
        <div v-for="item in vehiclesForShow" :key="item.id">
          <VehicleCard :vehicle="item"></VehicleCard>
        </div>
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
  </q-scroll-area>
</template>

<script>
import VehicleCard from "../components/VehicleCard";
import BaseMap from "../components/BaseMap";
import { Quasar, QScrollArea } from "quasar";
export default {
  name: "vehicles",
  components: { VehicleCard, BaseMap, QScrollArea },
  methods: {
    searchVehicle(vehicleID) {
      // console.log(vehicleID);
      if (vehicleID !== "") {
        let result = this.vehicles.filter(vehicle => vehicle.id === vehicleID);
        // console.log(result);
        this.vehiclesForShow = result;
      } else {
        this.vehiclesForShow = this.vehicles;
      }
    },
    async fetchVehicles() {
      this.vehicleID = "";
      this.vehiclesForShow = this.vehicles;
    },
    async openAddModal() {
      this.addModal = true;
    }
  },
  data() {
    return {
      addModal: false,
      vehicleID: "",
      vehiclesForShow: [],
      vehicles: [
        {
          id: "1",
          name: "123456789012345",
          status: true,
          type: "รถตู้",
          plateNumber: "70-1234",
          plateProvince: "ภูเก็ต",
          lat: "7.990846",
          long: "98.345138"
        },
        {
          id: "2",
          name: "รถโรงเรียน 2",
          status: true,
          type: "รถบัส",
          plateNumber: "70-6543",
          plateProvince: "นครศรีธรรมราช",
          lat: "8.006892",
          long: "98.342649"
        },
        {
          id: "3",
          name: "รถโรงเรียน",
          status: true,
          type: "รถตู้",
          plateNumber: "70-1234",
          plateProvince: "ภูเก็ต",
          lat: "7.990846",
          long: "98.345138"
        },
        {
          id: "4",
          name: "รถโรงเรียน 2",
          status: true,
          type: "รถบัส",
          plateNumber: "70-6543",
          plateProvince: "นครศรีธรรมราช",
          lat: "8.006892",
          long: "98.342649"
        },
        {
          id: "5",
          name: "รถโรงเรียน",
          status: true,
          type: "รถตู้",
          plateNumber: "70-1234",
          plateProvince: "ภูเก็ต",
          lat: "7.990846",
          long: "98.345138"
        },
        {
          id: "6",
          name: "รถโรงเรียน 2",
          status: true,
          type: "รถบัส",
          plateNumber: "70-6543",
          plateProvince: "นครศรีธรรมราช",
          lat: "8.006892",
          long: "98.342649"
        },
        {
          id: "7",
          name: "รถโรงเรียน",
          status: true,
          type: "รถตู้",
          plateNumber: "70-1234",
          plateProvince: "ภูเก็ต",
          lat: "7.990846",
          long: "98.345138"
        },
        {
          id: "8",
          name: "รถโรงเรียน 2",
          status: true,
          type: "รถบัส",
          plateNumber: "70-6543",
          plateProvince: "นครศรีธรรมราช",
          lat: "8.006892",
          long: "98.342649"
        },
        {
          id: "9",
          name: "รถโรงเรียน",
          status: true,
          type: "รถตู้",
          plateNumber: "70-1234",
          plateProvince: "ภูเก็ต",
          lat: "7.990846",
          long: "98.345138"
        },
        {
          id: "10",
          name: "รถโรงเรียน 2",
          status: true,
          type: "รถบัส",
          plateNumber: "70-6543",
          plateProvince: "นครศรีธรรมราช",
          lat: "8.006892",
          long: "98.342649"
        },
        {
          id: "11",
          name: "รถโรงเรียน",
          status: true,
          type: "รถตู้",
          plateNumber: "70-1234",
          plateProvince: "ภูเก็ต",
          lat: "7.990846",
          long: "98.345138"
        },
        {
          id: "12",
          name: "รถโรงเรียน 2",
          status: true,
          type: "รถบัส",
          plateNumber: "70-6543",
          plateProvince: "นครศรีธรรมราช",
          lat: "8.006892",
          long: "98.342649"
        }
      ]
    };
  },
  mounted() {
    this.vehiclesForShow = this.vehicles;
  }
};
</script>
<style lang="scss" scoped>
h2 {
  font-family: "FC_Home";
  color: $greyText;
}

.top {
  height: 230px;
  width: 100vw;
  z-index: 99;
  background: white;
  position: fixed;
  top: 0;
}

.table {
  margin-top: 25vh;
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
</style>
