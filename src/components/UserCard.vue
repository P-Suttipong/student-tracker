<template>
  <div>
    <q-card :class="getBackground" class="card">
      <div></div>
      <div class="row justify-between">
        <!-- <p class="col-1">ID : {{ beacon.id }}</p> -->
        <p :class="getTopicColor" class="col-1">{{ user.username }}</p>
        <p :class="getTopicColor" class="col-2">
          {{ user.firstname }} {{ user.lastname }}
        </p>
        <p :class="getTopicColor" class="col-2">{{ user.phone }}</p>
        <p :class="getTopicColor" class="col-1">{{ user.device_id }}</p>
        <p class="col-1 map-icon">
          <i :class="getTopicColor" class="fas fa-user-cog"></i>
        </p>
      </div>
    </q-card>
  </div>
</template>

<script>
import BaseMap from "../components/BaseMap";
export default {
  components: {
    BaseMap
  },
  props: ["user", "topic"],
  data() {
    return {
      value: true,
      openMap: false,
      lat: "",
      long: ""
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
    // async openMapModal(lat, long) {
    //   this.lat = lat;
    //   this.long = long;
    //   this.openMap = true;
    // },
    // openStudentModal() {
    //   this.$emit("openModal");
    //   this.$store.dispatch("getBeaconByDeviceID", this.vehicle.device_id);
    // },
    // openDeviceInfoModal() {
    //   this.$emit("openInfoModal");
    //   this.$emit("lineKey", this.vehicle.line_key);
    // }
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

.topic-bg {
  background: #16bfc4;
}

.topic-color {
  color: white;
}
</style>
