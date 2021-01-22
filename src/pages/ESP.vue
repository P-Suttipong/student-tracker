<template>
  <q-scroll-area
    style="height: 100vh;"
    class=" flex items-start justify-center"
  >
    <div class="column flex flex-center">
      <div class="top column flex flex-center">
        <h2>ESP List</h2>
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
          <q-btn @click="openAddModal()" class="add-btn-2"
            ><i class="fas fa-plus"></i
          ></q-btn>
        </div>
      </div>
      <div class="table">
        <div v-if="isLoading" class="row justify-center q-mb-md">
          <q-spinner class="spinner" size="3em" :thickness="5" />
        </div>
        <div v-else>
          <ESPCard :beacon="espTopic" :topic="true"></ESPCard>
          <div v-for="item in ESPList" :key="item.id">
            <ESPCard :beacon="item" :topic="false"></ESPCard>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="addModal">
      <q-card class="dialog-card">
        <div>
          <q-input v-model="esp_id" class="add-input" outlined label="ESP ID" />
          <q-input
            v-model="device_id"
            class="add-input"
            outlined
            label="Device ID"
          />
          <q-input
            v-model="mac"
            class="add-input"
            outlined
            label="MAC Address"
          />
          <div class="row justify-center">
            <q-btn @click="confirmAdd" class="add-btn">เพิ่ม</q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-scroll-area>
</template>

<script>
import { Quasar, QScrollArea } from "quasar";
import ESPCard from "../components/ESPCard";
import { mapState } from "vuex";
export default {
  name: "esp",
  components: { ESPCard, QScrollArea },
  data() {
    return {
      beaconID: "",
      isLoading: false,
      addModal: false,
      esp_id: "",
      device_id: "",
      mac: "",
      espTopic: {
        esp_id: "ESP ID"
      }
    };
  },
  computed: {
    ...mapState({
      ESPList: state => state.school.ESPList
    })
  },
  methods: {
    searchByAPI() {},
    openAddModal() {
      this.addModal = true;
    },
    async confirmAdd() {}
  },
  mounted() {
    this.isLoading = true;
    this.$store.dispatch("getESPList");
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
