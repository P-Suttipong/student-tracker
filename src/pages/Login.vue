<template>
  <q-page class="row justify-center items-center page">
    <div class="column">
      <div class="row justify-center">
        <p
          v-if="this.$q.platform.is.desktop || this.$q.platform.is.ipad"
          class="login-title"
        >
          Student Tracker : Backoffice
        </p>
        <div class="column items-center justify-center" v-else>
          <img class="login-image" src="~assets/Logo.png" />
        </div>
      </div>
      <div class="row">
        <q-card bordered class="card-padding shadow-20">
          <div class="row justify-between">
            <div
              v-if="this.$q.platform.is.desktop || this.$q.platform.is.ipad"
              class="col-5 column items-center justify-center"
            >
              <img class="login-image" src="~assets/Logo.png" />
            </div>
            <div class="col-6 col-mobile">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    square
                    filled
                    clearable
                    v-model="username"
                    type="text"
                    label="username"
                    class="login"
                    ><template v-slot:prepend>
                      <q-icon name="person" /> </template
                  ></q-input>
                  <q-input
                    square
                    filled
                    clearable
                    v-model="password"
                    class="login"
                    type="password"
                    label="password"
                    ><template v-slot:prepend>
                      <q-icon name="vpn_key" /> </template
                  ></q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  @click="login()"
                  unelevated
                  rounded
                  class="full-width"
                  color="light-blue-8"
                  size="lg"
                >
                  Login
                </q-btn>
              </q-card-actions>
              <!-- <q-card-section class="text-center q-pa-none">
                <p class="text-grey-6">ลืมรหัสผ่าน ?</p>
              </q-card-section> -->
            </div>
          </div>
        </q-card>
      </div>
      <q-dialog v-model="invalidLogin" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
            <span class="q-ml-sm"
              ><p style="font-size: 18px" class="q-mt-md q-px-xl">
                Login failed Username or Password wrong
              </p></span
            >
          </q-card-section>

          <q-card-actions align="center">
            <q-btn flat label="OK" color="red" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      username: "",
      password: "",
      invalidLogin: false
    };
  },
  methods: {
    async login() {
        let res = await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        console.log("RES", res);
        if (res) {
          this.$router.push("/");
        } else {
          this.invalidLogin = true;
        }
    },
    async logout() {
      localStorage.removeItem("user");
    }
  }
};
</script>

<style scoped>
.page {
  /* background-color: #2c323f; */
  /* background: linear-gradient(180deg, #13151b 10%, #2c323f 55%, #fff 20%); */
  /* background: url("~assets/img/bg.jpg"); */
  background: rgb(238, 174, 202);
  background: linear-gradient(
    90deg,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
}

p {
  font-family: "FC_Home";
}
button {
  font-family: "FC_Home";
}
.card-padding {
  padding: 40px;
  width: 50vw;
}
.login-title {
  text-shadow: 5px 5px 5px #1f1f1f;
  color: white;
  font-size: 60px;
  animation: slideInUp;
  animation-duration: 1s;
}

.login-image {
  height: 230px;
  width: 20vw;
  object-fit: contain;
}

/* Mobile */
@media only screen and (max-width: 420px) {
  .card-padding {
    padding: 5px;
    width: 90vw;
  }

  .login-image {
    padding-top: 8px;
    height: 210px;
    width: 50vw;
    object-fit: contain;
  }

  .login-title {
    color: white;
    font-size: 32px;
    animation: bounce;
    animation-duration: 2s;
  }

  .col-mobile {
    width: 88vw;
  }
}

/* Tablet Ipad */
@media only screen and (min-width: 500px) and (max-width: 1025px) {
  .card-padding {
    padding: 20px;
    width: 90vw;
  }
  .login-image {
    padding-top: 8px;
    height: 210px;
    width: 40vw;
    object-fit: fill;
  }
}
</style>
