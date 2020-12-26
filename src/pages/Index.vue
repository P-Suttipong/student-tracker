<template>
  <q-scroll-area
    style="height: 100vh;"
    class=" flex items-start justify-center"
  >
    <div class="column flex flex-center">
      <div class="top column flex flex-center">
        <h2>ข้อมูลยานพาหนะ</h2>
        <q-input
          @input="searchVehicle(vehicleID)"
          class="search"
          dense
          rounded
          v-model="vehicleID"
          label="Serach"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon
              v-if="vehicleID !== ''"
              name="close"
              @click="vehicleID = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </div>
      <div class="table">
        <div v-for="item in vehicles" :key="item.id">
          <VehicleCard :vehicle="item"></VehicleCard>
        </div>
      </div>
      <q-btn class="add-btn"><i class="fas fa-plus"></i></q-btn>
    </div>
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
      console.log(vehicleID);
      if (vehicleID !== "") {
        let result = this.vehicles.filter(vehicle => vehicle.id === vehicleID);
        console.log(result);
        this.vehicles = result;
      } else {
        this.vehicles = this.vehicles;
      }
    }
  },
  data() {
    return {
      vehicleID: "",
      vehicles: [
        {
          id: "1",
          name: "รถโรงเรียน",
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
  border: 2px solid $greyText;
  margin-top: -30px;
  margin-bottom: 30px;
}
.add-btn {
  background-color: $pink;
  color: white;
  border-radius: 50px;
  width: 70px;
  height: 70px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  font-size: 20px;
  z-index: 100;
}
</style>
