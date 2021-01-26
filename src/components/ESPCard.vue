<template>
  <div>
    <q-card :class="getBackground" class="card">
      <div></div>
      <div class="row justify-between">
        <p :class="getTopicColor" class="col-2">{{ beacon.esp_id }}</p>
        <p @click="openBeaconListModal(beacon.esp_id)" class="col-1 map-icon">
          <i :class="getTopicColor" class="fas fa-list-alt"></i>
        </p>
      </div>
    </q-card>
    <q-dialog v-model="openModal">
      <q-card class="beacon-list">
        <q-card-section class="top-add-modal ">
          <div class="row  justify-between">
            <p class="modal-title">{{ beacon.esp_id }}</p>
            <q-btn @click="openAddModal()" class="add-beacon add-btn-2"
              ><i class="fas fa-plus"></i
            ></q-btn>
          </div>

          <div class="topic q-mt-sm row justify-between">
            <p class="col-2 q-pl-lg topic-title">Device ID</p>
            <p class="col-3 topic-title">MAC</p>
            <p class="col-2 topic-title">EEPROM</p>
            <p class="col-2 topic-title">Status</p>
            <p class="col-1 topic-title">Tool</p>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="list">
          <div v-for="item in beaconFromEspID.slice().reverse()" :key="item.id">
            <div class="row justify-between">
              <p class="detial col-2 q-pl-lg ">{{ item.device_id }}</p>
              <p class="detial col-3">
                {{ item.mac.length > 0 ? item.mac : "EMPTY" }}
              </p>
              <p class="detial col-2 q-pl-lg ">{{ item.eeprom }}</p>
              <p class="detial col-2">{{ getStatus(item.status) }}</p>
              <p
                @click="
                  deleteFromEEPROM(item.esp_id, item.device_id, item.eeprom)
                "
                v-if="item.status === `2`"
                class="detial col-1 delete-icon"
              >
                <i class="fas fa-trash-alt"></i>
              </p>
              <p
                @click="cancelSetting(item.id, item.esp_id, item.mac)"
                v-if="item.status === `0`"
                class="detial col-1 delete-icon"
              >
                <i class="fas fa-times"></i>
              </p>
              <p
                v-if="item.status === `1` || item.status === `3`"
                class="detial col-1 delete-icon"
              >
                -
              </p>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="addModal">
      <q-card class="dialog-card">
        <div class="row justify-between">
          <q-input
            v-model="device_id"
            class="add-input"
            outlined
            label="Device ID"
            mask="######"
          />
          <q-input
            v-model="eeprom"
            class="add-input"
            outlined
            label="EEPROM Address"
            mask="##"
          />
          <q-input
            v-model="mac"
            class="add-input"
            outlined
            label="MAC Address"
            mask="NN:NN:NN:NN:NN:NN"
          />
        </div>
        <div class="row q-mt-md justify-center">
          <q-btn @click="confirmAdd" class="add-btn">เพิ่ม</q-btn>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import BaseMap from "../components/BaseMap";
import { mapState } from "vuex";
export default {
  components: {
    BaseMap
  },
  props: ["beacon", "topic"],
  data() {
    return {
      value: true,
      openModal: false,
      lat: "",
      long: "",
      status: "",
      esp_id: "",
      device_id: "",
      eeprom: "",
      mac: "",
      addModal: false
    };
  },
  computed: {
    ...mapState({
      beaconFromEspID: state => state.school.beaconFromEspID
    }),
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
    async confirmAdd() {
      let res = await this.$store.dispatch("addBeacon", {
        esp_id: this.esp_id,
        device_id: this.device_id,
        eeprom: this.eeprom,
        mac: this.mac
      });
      this.$store.dispatch("getBeaconByEspID", this.esp_id);
      this.device_id = "";
      this.mac = "";
      this.eeprom = "";
    },
    getStatus(status) {
      if (status === "0") {
        return "รอการตั้งค่า";
      } else if (status === "1") {
        return "รอตอบกลับ";
      } else if (status === "2") {
        return "ตั้งค่าแล้ว";
      } else if (status === "3") {
        return "ยกเลิก";
      }
    },
    async openBeaconListModal(id) {
      console.log(id);
      await this.$store.dispatch("getBeaconByEspID", id);
      this.esp_id = id;
      // console.log("beaconFromEspID : ", this.beaconFromEspID);
      this.openModal = true;
    },
    openAddModal() {
      this.addModal = true;
    },
    async cancelSetting(id, esp_id, mac) {
      this.$store.dispatch("cancelBeaconSetting", {
        id: id,
        esp_id: esp_id,
        mac: mac
      });
    },
    async deleteFromEEPROM(esp_id, device_id, eeprom) {
      console.log("delete");
      let res = await this.$store.dispatch("addBeacon", {
        esp_id: esp_id,
        device_id: device_id,
        eeprom: eeprom,
        mac: ""
      });
      this.$store.dispatch("getBeaconByEspID", this.esp_id);
    }
  },
  mounted() {
    console.log("BEACON", this.beacon);
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 60vw;
}

.beacon-list {
  min-width: 960px;
  height: 63vh;
}

.top-add-modal {
  z-index: 99;
  position: fixed;
  top: 10vh;
  width: 960px;
  background: white;
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

.add-btn {
  background-color: $blue;
  color: white;
  border-radius: 10px;
  width: 80px;
  height: 50px;
  font-size: 20px;
  font-family: "FC_Home";
}

.add-btn-2 {
  margin-top: 0px;
  margin-left: 10px;
  background-color: $pink;
  color: white;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  font-size: 20px;
}

.list {
  margin-top: 40px;
}

.topic {
  // font-weight: bold;
  background: #16bfc4;
  margin-bottom: 0px;
}

.topic-title {
  color: white;
}

.modal-title {
  font-size: 32px;
  margin-bottom: -20px;
}

.delete-icon {
  padding-left: 10px;
  padding-top: 5px;
  font-size: 20px;
  cursor: pointer;
}

.delete-icon:hover {
  color: $pink;
}

.dialog-card {
  min-width: 650px;
  padding: 20px 20px 20px 20px;
}

.add-input {
  width: 200px;
  margin-bottom: 10px;
}
</style>
