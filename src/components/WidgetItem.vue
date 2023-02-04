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
      <span>♪ 3.0m/s SSE</span>
      <span>♫ 1021hPa</span>
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

export default {
  name: "WidgetItem",
  components: {
    WeatherImages,
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
</style>
