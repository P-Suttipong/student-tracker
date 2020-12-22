<template>
  <q-layout view="lHh lpR lFf">
    <q-drawer :width="150" show-if-above v-model="left" side="left" elevated>
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
          <img class="icon-menu" src="~assets/img/device_icon.png" />
          <img class="icon-menu" src="~assets/img/students_icon.png" />
        </div>
        <div class="col-4 d-flex flex justify-center">
          <img class="icon-menu" src="~assets/img/logout_icon.png" />
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
      vehicleClass: ""
    };
  },
  methods: {
    vehicleActive() {
      this.vehicleClass = "active-menu";
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
  width: 150px;
}

.icon-menu:hover {
  background-color: rgba($pink, 0.2);
  cursor: pointer;
  // border-left: 5px solid red;
  // filter: sepia(100%);
}

.active-menu {
  border-right: 8px solid $pink;
}

.logo {
  width: 150px;
}
</style>
