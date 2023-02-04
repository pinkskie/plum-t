<template>
  <div v-if="settingsView" class="widget settings">
    <div class="inline">
      <span class="bold-text">Settings</span>
      <button class="settings-btn" @click="toggleSettings">
        <SettingsIcon :settingsView="settingsView" />
      </button>
    </div>
    <draggable class="locations-list" v-model="locations">
      <LocationItem
        v-for="location in locations"
        :key="location.id"
        :location="location"
        @click="removeLocation(location.id)"
        :disabled="locations.length <= 1"
      />
    </draggable>
    <div>
      <p class="bold-text">Add location:</p>
      <div class="new-location">
        <input
          class="add-input"
          v-model="selected"
          v-on:keyup.enter="onEnter"
          placeholder="London for example"
          v-on:focus="errorMsg = ''"
        />
        <button @click="onEnter">
          <EnterIcon />
        </button>
      </div>
      <ErrorMessage :message="errorMsg" />
    </div>
  </div>

  <!-- widget view -->
  <div v-else class="widget">
    <button class="settings-btn" @click="toggleSettings" v-if="!loading">
      <SettingsIcon />
    </button>
    <p v-if="loading">Loading...</p>
    <div v-else class="widget-items">
      <WidgetItem
        :weather="weather"
        v-for="weather in weathers"
        :key="weather.id"
      />
    </div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>
    <div v-if="errorRequestGeolocation">
      <ErrorMessage :message="errorRequestGeolocation" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import draggable from "vuedraggable";
import WidgetItem from "./WidgetItem.vue";
import LocationItem from "./LocationItem.vue";
import ErrorMessage from "./ErrorMessage.vue";
import SettingsIcon from "../assets/icons/SettingsIcon.vue";
import EnterIcon from "../assets/icons/EnterIcon.vue";
import WeatherImages from "../assets/WeatherImages.vue";

const http = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    appid: "fc529faab666ff44fe1592d9696f3447",
  },
});

export default {
  components: {
    draggable,
    SettingsIcon,
    WidgetItem,
    LocationItem,
    EnterIcon,
    WeatherImages,
    ErrorMessage,
  },
  data() {
    return {
      loading: false,
      errorMsg: "",
      settingsView: false,
      locations: [],
      weathers: [],
      selected: "",

      gettingLocation: false,
      errorRequestGeolocation: "",
    };
  },
  created() {
    this.locations = JSON.parse(localStorage.getItem("locations") || "[]");

    if (!this.locations.length) {
      this.getLocation();
    }
  },
  watch: {
    async locations() {
      localStorage.setItem("locations", JSON.stringify(this.locations));
      try {
        if (!this.locations.length) {
          this.getLocation();

          return;
        }
        this.loading = true;
        await http
          .get("group", {
            params: {
              id: this.locations.map((item) => item.id).join(","),
              units: "metric",
            },
          })
          .then((res) => {
            this.weathers = res.data.list;
            this.loading = false;
          });
      } catch (error) {
        this.errorMsg = error.message;
      }
    },
  },
  methods: {
    getLocation() {
      if (!("geolocation" in navigator)) {
        this.errorRequestGeolocation = "Geolocation is not available.";
        return;
      }
      this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.gettingLocation = false;

          http
            .get(
              `weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
            )
            .then((res) => {
              const data = {
                id: res.data.id,
                name: res.data.name,
              };
              localStorage.setItem("locations", JSON.stringify([data]));
              this.locations = [data];
            });
        },
        (err) => {
          this.gettingLocation = false;
          this.errorRequestGeolocation = err.message;
        }
      );
    },
    onEnter() {
      if (!this.selected.trim().length) {
        return;
      }
      http
        .get(`weather?q=${this.selected}`)
        .then((res) => {
          const data = [
            ...new Set([
              ...this.locations,
              {
                id: res.data.id,
                name: res.data.name,
              },
            ]),
          ];
          localStorage.setItem("locations", JSON.stringify(data));
          this.locations = data;
          this.selected = "";
          this.errorMsg = "";
        })
        .catch((error) => (this.errorMsg = error.response.data.message));
    },
    toggleSettings() {
      this.settingsView = !this.settingsView;
    },
    removeLocation(id) {
      const items = this.locations.filter((item) => item.id !== id);
      localStorage.setItem("locations", JSON.stringify(items));
      this.locations = items;
    },
  },
};
</script>

<style scoped>
button {
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
svg {
  background-color: transparent;
}
.widget {
  width: 15rem;
  padding: 1.5rem;
  box-shadow: 1px 1px 15px -5px grey;
  display: flex;
  flex-direction: column;
  position: relative;
}
.widget-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.settings-btn {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
}
.inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.bold-text {
  font-weight: 700;
}
.locations-list {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}
.location {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(189, 195, 199, 22%);
  padding: 0.5rem;
  border-radius: 2px;
  width: 100%;
}
.location-info {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.new-location {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}
.add-input {
  width: 100%;
  padding: 0.4rem;
}
.add-input::placeholder {
  font-family: "Nunito", sans-serif;
}
</style>
