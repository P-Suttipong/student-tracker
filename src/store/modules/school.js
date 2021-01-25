import axios from "axios";
const jsSha1 = require("js-sha1");
const api = axios.create({
  baseURL: "http://103.7.57.134:8080/andaman/studentTracker/backOffice",
  headers: {
    crossdomain: true,
    "Access-Control-Allow-Origin": "*"
  }
  //   mode: "no-cors"
});

const state = {
  vehiclesList: [],
  vehiclesSearch: [],
  loginLoading: false,
  studentList: [],
  beaconList: [],
  userList: [],
  ESPList: [],
  beaconFromEspID: []
};

const getters = {};

const actions = {
  login: async ({ commit }, payload) => {
    commit("SET_LOGINLOADING", true);
    let platform = navigator.platform;
    let term;
    await fetch("https://api.ipify.org?format=json")
      .then(x => x.json())
      .then(({ ip }) => {
        term = ip;
      });
    // let geo = {};
    // navigator.geolocation.getCurrentPosition(
    //   pos => {
    //     console.log(pos);
    //     geo = pos;
    //     console.log("GEO", geo);
    //   },
    //   error => {
    //     console.log(error.message);
    //     geo = error.message;
    //   }
    // );
    let resData = null;
    let hashPassword = await jsSha1(payload.password);
    console.log(payload.username + " " + hashPassword);
    await api
      .post(
        `/login`,
        {},
        {
          headers: {
            username: payload.username,
            password: hashPassword,
            platform: platform,
            ip: term
          }
        }
      )
      .then(res => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: payload.username
          })
        );
        localStorage.setItem("loginAt", res.data.loginAt);
        resData = res.data.loginAt;
        console.log(res);
      })
      .catch(error => {
        console.log("Get Device List Error :", error.message);
        resData = false;
      });
    commit("SET_LOGINLOADING", false);
    return resData;
  },
  logout: async ({ commit }) => {
    localStorage.removeItem("user");
    localStorage.removeItem("loginAt");
    return true;
  },
  getVehiclesList: async ({ commit }, payload) => {
    console.log(payload);
    await api
      .get(`/vehiclesList`, {
        headers: {
          page: payload.page,
          size: payload.size
        }
      })
      .then(res => {
        console.log(res);
        commit("SET_VEHICLES_LIST", res.data);
      })
      .catch(error => {
        console.log("Get Vehicles List Error :", error.message);
      });
  },
  searchVehicleByID: async ({ commit }, id) => {
    console.log(id);
    await api
      .get(`/searchVehicleByID`, {
        headers: {
          device_id: id
        }
      })
      .then(res => {
        console.log(res);
        commit("SET_VEHICLES_SEARCH", res.data);
      })
      .catch(error => {
        console.log("Get Vehicles List Error :", error.message);
      });
  },
  getAllBeacon: async ({ commit }) => {
    await api
      .get("/getAllBeacon")
      .then(res => {
        console.log(res);
        if (res.data.length > 0) {
          commit("SET_BEACONLIST", res.data);
        }
      })
      .catch(error => {
        console.log("Get Beacon Error :", error.message);
      });
  },
  getBeaconByDeviceID: async ({ commit }, id) => {
    console.log(id);
    await api
      .get(`/getBeaconByDeviceID`, {
        headers: {
          device_id: id
        }
      })
      .then(res => {
        console.log(res);
        if (res.data.length > 0) {
          commit("SET_STUDENT_LIST", res.data);
        } else {
          commit("SET_STUDENT_LIST", []);
        }
      })
      .catch(error => {
        console.log("Get Beacon By ID Error :", error.message);
      });
  },
  updateBeacon: async ({ commit }, payload) => {
    console.log(payload);
    // let decodeName = payload.name.decode(decodeURI, StandardCharsets.UTF_8);
    let gender;
    await api
      .put("/updateBeacon", {
        device_id: payload.device_id,
        beacon_id: payload.beacon_id,
        name: payload.name,
        parents_phone: payload.parents_phone,
        gender: payload.gender
      })
      .then(res => {
        console.log(res);
        commit("UPDATE_STUDENT_LIST", res.data);
      })
      .catch(error => {
        console.log("Update Beacon Error :", error.message);
      });
  },
  getUserList: async ({ commit }) => {
    await api
      .get("/getUserList")
      .then(res => {
        console.log(res);
        commit("SET_USER_LIST", res.data);
      })
      .catch(error => {
        console.log("Get User Error :", error.message);
      });
  },
  addUser: async ({ commit }, payload) => {
    console.log(payload);
    let hashPassword = await jsSha1(payload.password);
    let resData = false;
    await api
      .post("/addUser", {
        username: payload.username,
        password: hashPassword,
        firstname: payload.firstname,
        lastname: payload.lastname,
        phone: payload.phone,
        device_id: payload.device_id
      })
      .then(res => {
        console.log(res);
        // commit("UPDATE_STUDENT_LIST", res.data);
        resData = true;
      })
      .catch(error => {
        console.log("Add User Error :", error.message);
        resData = false;
      });
    return resData;
  },
  getESPList: async ({ commit }) => {
    await api
      .get("/getESPList")
      .then(res => {
        console.log(res);
        commit("SET_ESP_LIST", res.data);
      })
      .catch(error => {
        console.log("Get esp list Error :", error.message);
      });
  },
  addBeacon: async ({ commit }, payload) => {
    console.log(payload);
    let resData;
    await api
      .post(
        "/addBeacon",
        {},
        {
          headers: {
            esp_id: payload.esp_id,
            device_id: payload.device_id,
            mac: payload.mac,
            eeprom: payload.eeprom
          }
        }
      )
      .then(res => {
        console.log(res);
        resData = true;
      })
      .catch(error => {
        console.log("add beacon Error :", error.message);
        resData = false;
      });
    return resData;
  },
  getBeaconByEspID: async ({ commit }, id) => {
    console.log(id);
    await api
      .get("/getBeaconByEspID", {
        headers: {
          esp_id: id
        }
      })
      .then(res => {
        console.log(res);
        commit("SET_BEACON_BY_ESP", res.data);
      })
      .catch(error => {
        console.log("Get beacon list Error :", error.message);
      });
  }
};

const mutations = {
  SET_VEHICLES_LIST(state, payload) {
    console.log(payload);
    state.vehiclesList = payload;
  },
  SET_VEHICLES_SEARCH(state, payload) {
    console.log(payload);
    state.vehiclesSearch = payload;
  },
  SET_LOGINLOADING(state, status) {
    state.loginLoading = status;
  },
  SET_STUDENT_LIST(state, list) {
    state.studentList = list;
  },
  SET_BEACONLIST(state, list) {
    state.beaconList = list;
  },
  SET_USER_LIST(state, list) {
    state.userList = list;
  },
  SET_ESP_LIST(state, list) {
    state.ESPList = list;
  },
  SET_BEACON_BY_ESP(state, list) {
    state.beaconFromEspID = list;
  },
  UPDATE_STUDENT_LIST(state, data) {
    console.log(data);
    state.studentList.map(student => {
      if (student.id === data.id) {
        student.last_status = data.last_status;
        student.name = data.name;
        student.parents_phone = data.parents_phone;
        student.time_stamp = data.time_stamp;
        student.gender = data.gender;
      }
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
