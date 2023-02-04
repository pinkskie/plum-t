<template>
  <div>
    <div class="inline">
      <span class="bold-text"
        >{{ weather.name }} {{ weather.sys.country }}</span
      >
    </div>
    <div class="widget-temp">
      <WeatherImages :info="weather.weather[0].main" />
      <p>{{ Math.floor(weather.main.temp) }}°С</p>
    </div>
    <p>
      Feels like {{ Math.floor(weather.main.feels_like) }}.
      {{ weather.weather[0].main }}.
      {{ weather.weather[0].description }}
    </p>
    <div class="inline">
      <span title="Wind speed" class="inlineIcon"
        ><WindIcon /> {{ weather.wind.speed }} m/s
      </span>
      <span title="Wind speed" class="inlineIcon"
        ><CompassIcon /> {{ weather.main.pressure }}hPa
      </span>
    </div>
    <div class="inline">
      <span>Humadity: {{ weather.main.humidity }}%</span>
      <span>Dew point: 0°c</span>
    </div>
    <span class="visibility">
      Visibility: {{ weather.visibility / 100 }} km
    </span>
  </div>
</template>

<script>
import WeatherImages from "../assets/WeatherImages.vue";
import WindIcon from "../assets/icons/WindIcon.vue";
import CompassIcon from "../assets/icons/CompassIcon.vue";

export default {
  name: "WidgetItem",
  components: {
    WeatherImages,
    WindIcon,
    CompassIcon,
  },
  props: {
    weather: Object,
  },
};
</script>

<style scoped>
.inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.widget-temp {
  font-size: 2.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.bold-text {
  font-weight: 700;
}
.inlineIcon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
