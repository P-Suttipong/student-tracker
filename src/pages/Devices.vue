<template>
  <q-scroll-area
    style="height: 100vh;"
    class=" flex items-start justify-center"
  >
    <div class="column flex flex-center">
      <div class="top column flex flex-center">
        <h2>Beacon List</h2>
        <div class="row">
          <q-input
            class="search"
            dense
            rounded
            v-model="beaconID"
            label="Serach By ID"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon
                v-if="beaconID !== ''"
                name="close"
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
      </div>
      <div class="table">
        <div v-if="isLoading" class="row justify-center q-mb-md">
          <q-spinner class="spinner" size="3em" :thickness="5" />
        </div>
        <div v-else>
          <BeaconCard :beacon="beaconTopic" :topic="true"></BeaconCard>
          <div v-for="item in beaconList" :key="item.id">
            <BeaconCard :beacon="item" :topic="false"></BeaconCard>
          </div>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
import { Quasar, QScrollArea } from "quasar";
import BeaconCard from "../components/BeaconCard";
import { mapState } from "vuex";
export default {
  name: "devices",
  components: { BeaconCard, QScrollArea },
  data() {
    return {
      beaconID: "",
      isLoading: false,
      addModal: false,
      esp_id: "",
      device_id: "",
      mac: "",
      eeprom: "",
      beaconTopic: {
        name: "Name",
        mac: "MAC Address",
        esp_id: "ESP ID",
        device_id: "Device ID",
        account: "Account"
      }
    };
  },
  computed: {
    ...mapState({
      beaconList: state => state.school.beaconList
    })
  },
  methods: {
    searchByAPI() {},
    openAddModal() {
      this.addModal = true;
    },
    confirmAdd() {
      let res = this.$store.dispatch("addBeacon", {
        esp_id: this.esp_id,
        device_id: this.device_id,
        mac: this.mac
      });
      this.esp_id = "";
      this.device_id = "";
      this.mac = "";
    }
  },
  mounted() {
    this.isLoading = true;
    this.$store.dispatch("getAllBeacon");
    this.isLoading = false;
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
</style>
