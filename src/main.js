import Vue from "vue";

import VueCustomElement from "vue-custom-element";
Vue.use(VueCustomElement);

import Widget from "./components/Widget";

Vue.customElement("weather-widget", Widget);
