<template>
  <div>
    <q-card :class="getBackground" class="card">
      <div></div>
      <div class="row justify-between">
        <p :class="getTopicColor" class="col-2">{{ vehicle.device_id }}</p>
        <p :class="getTopicColor" class="col-4">{{ vehicle.name }}</p>
        <p :class="getTopicColor" class="col-3">{{ vehicle.account }}</p>
        <!-- <q-toggle
          color="teal-4"
          class="toggle col-1"
          v-model="vehicle.status"
        /> -->
        <!-- <p class="col-1">{{ vehicle.type }}</p> -->
        <!-- <p class="col-1">{{ vehicle.plateNumber }}</p> -->
        <!-- <p class="col-2">{{ vehicle.plateProvince }}</p> -->
        <div class="col-2 row justify-between">
          <p @click="openMapModal(vehicle.lat, vehicle.lon)" class="map-icon">
            <i :class="getTopicColor" class="fas fa-map-marked-alt"></i>
          </p>
          <p class="map-icon" @click="openStudentModal()">
            <i :class="getTopicColor" class="fas fa-users"></i>
          </p>
          <p class="map-icon" @click="openDeviceInfoModal()">
            <i :class="getTopicColor" class="fas fa-inbox"></i>
          </p>
        </div>
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
  props: ["vehicle", "topic"],
  data() {
    return {
      value: true,
      openMap: false,
      lat: "",
      long: "",
      counter: 0
    };
  },
  computed: {
    getBackground() {
      if (this.topic === true) {
        return "topic-bg";
      }
    },
    getTopicColor() {
      if (this.topic === true) {
        return "topic-color";
      }
    }
  },
  methods: {
    async openMapModal(lat, long) {
      if (this.topic !== true) {
        this.lat = lat;
        this.long = long;
        this.openMap = true;
      }
    },
    openStudentModal() {
      if (this.topic !== true) {
        this.$emit("openModal");
        this.$emit("deviceID", this.vehicle.device_id);
        this.$store.dispatch("getBeaconByDeviceID", this.vehicle.device_id);
      }
    },
    openDeviceInfoModal() {
      if (this.topic !== true) {
        this.$emit("openInfoModal");
        this.$emit("lineKey", this.vehicle.line_key);
      }
    }
  },
  mounted() {
    // console.log(this.vehicle);
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 60vw;
}

.topic-bg {
  background: #16bfc4;
}

.topic-color {
  color: white;
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
