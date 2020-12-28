<template>
  <div>
    <q-card class="card">
      <div></div>
      <div class="row justify-between">
        <p class="col-1">ID : {{ vehicle.id }}</p>
        <p class="col-2">{{ vehicle.name }}</p>
        <q-toggle
          color="teal-4"
          class="toggle col-1"
          v-model="vehicle.status"
        />
        <p class="col-1">{{ vehicle.type }}</p>
        <p class="col-1">{{ vehicle.plateNumber }}</p>
        <p class="col-2">{{ vehicle.plateProvince }}</p>
        <p @click="openMapModal(vehicle.lat, vehicle.long)" class="map-icon">
          <i class="fas fa-map-marked-alt"></i>
        </p>
        <p class="map-icon">
          <i class="fas fa-users"></i>
        </p>
        <p class="map-icon">
          <i class="fas fa-inbox"></i>
        </p>
      </div>
    </q-card>
    <q-dialog v-model="openMap"
      ><div class="mapModal">
        <BaseMap :location="[lat, long]"></BaseMap>
        <div class="row q-mt-md justify-center">
          <p class="q-mr-md">ชื่อ : {{ vehicle.name }}</p>
          <p>ป้าย : {{ vehicle.plateNumber }} {{ vehicle.plateProvince }}</p>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import BaseMap from "../components/BaseMap";
export default {
  components: {
    BaseMap
  },
  props: ["vehicle"],
  data() {
    return {
      value: true,
      openMap: false,
      lat: "",
      long: ""
    };
  },
  methods: {
    async openMapModal(lat, long) {
      this.lat = lat;
      this.long = long;
      this.openMap = true;
    }
  },
  mounted() {
    // console.log(this.vehicle);
  }
};
</script>

<style lang="scss" scoped>
.card {
  border: 3px solid #16bfc4;
  width: 80vw;
  height: 6vh;
  padding: 20px 30px 20px 30px;
  border-radius: 10px;
  line-height: 80%;
  margin-bottom: 10px;
}

p {
  font-family: "FC_Home";
  font-size: 24px;
  color: $greyText;
}

.map-icon {
  color: $blue;
  margin-top: -7px;
}

.map-icon:hover {
  color: $pink;
  cursor: pointer;
}

.toggle {
  color: #16bfc4;
  margin-top: -20px;
}

.mapModal {
  background: white;
  width: 60vw;
  border-radius: 20px;
}
</style>
