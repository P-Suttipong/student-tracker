<template>
  <q-layout view="lHh lpR lFf">
    <q-drawer :width="150" show-if-above v-model="left" side="left" bordered>
      <div class="justify-center">
        <img class="q-mt-xs logo" src="~assets/Logo.png" />
      </div>
      <q-separator class="q-mb-lg" size="0.2rem" color="grey" inset />
      <div class="column justify-between">
        <div class="col-4 d-flex flex justify-center">
          <img
            @click="vehicleActive()"
            :class="vehicleClass"
            class="icon-menu"
            src="~assets/img/van_icon.png"
          />
          <img
            @click="deviceActive()"
            :class="deviceClass"
            class="icon-menu"
            src="~assets/img/beacon_icon.png"
          />
          <img
            @click="espActive()"
            :class="espClass"
            class="icon-menu"
            src="~assets/img/device_icon.png"
          />
          <img
            @click="studentActive()"
            :class="studentClass"
            class="icon-menu"
            src="~assets/img/user_icon.png"
          />
        </div>
        <div class="logout col-4 d-flex flex justify-center">
          <img
            @click="logOut()"
            class="icon-menu"
            src="~assets/img/logout_icon.png"
          />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false,
      vehicleClass: "",
      deviceClass: "",
      studentClass: "",
      espClass: ""
    };
  },
  methods: {
    vehicleActive() {
      this.vehicleClass = "active-menu";
      this.deviceClass = "";
      this.studentClass = "";
      this.userClass = "";
      this.espClass = "";
      this.$router.push("/");
    },
    deviceActive() {
      this.vehicleClass = "";
      this.deviceClass = "active-menu";
      this.studentClass = "";
      this.userClass = "";
      this.espClass = "";
      this.$router.push("/devices");
    },
    studentActive() {
      this.vehicleClass = "";
      this.deviceClass = "";
      this.studentClass = "active-menu";
      this.userClass = "";
      this.espClass = "";
      this.$router.push("/users");
    },
    espActive() {
      this.vehicleClass = "";
      this.deviceClass = "";
      this.studentClass = "";
      this.userClass = "";
      this.espClass = "active-menu";
      this.$router.push("/esp");
    },
    async logOut() {
      let res = await this.$store.dispatch("logout");
      if (res) {
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    console.log(this.$route);
    if (this.$route.path === "/devices") {
      this.vehicleClass = "";
      this.deviceClass = "active-menu";
      this.studentClass = "";
      this.espClass = "";
    } else if (this.$route.path === "/users") {
      this.vehicleClass = "";
      this.deviceClass = "";
      this.studentClass = "active-menu";
      this.espClass = "";
    } else if (this.$route.path === "/esp") {
      this.vehicleClass = "";
      this.deviceClass = "";
      this.studentClass = "";
      this.espClass = "active-menu";
    } else {
      this.vehicleClass = "active-menu";
      this.deviceClass = "";
      this.studentClass = "";
      this.espClass = "";
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  font-family: "FC_Home";
}
.drawer {
  background-color: black;
}

.icon-menu {
  width: 145px;
}

.icon-menu:hover {
  background-color: rgba($pink, 0.2);
  cursor: pointer;
}

.active-menu {
  border-right: 8px solid $pink;
}

.logo {
  width: 145px;
}

.logout {
  margin-top: 30vh;
}
</style>
