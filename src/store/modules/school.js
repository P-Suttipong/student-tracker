import axios from "axios";
const jsSha1 = require("js-sha1");
const api = axios.create({
  baseURL: "http://103.7.57.134:8080/andaman/studentTracker/backOffice",
  headers: { crossdomain: true, "Access-Control-Allow-Origin": "*" }
  //   mode: "no-cors"
});

const state = {
  vehiclesList: [],
  vehiclesSearch: []
};

const getters = {};

const actions = {
  login: async ({ commit }, payload) => {
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
            password: hashPassword
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
        resData = error;
      });
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
