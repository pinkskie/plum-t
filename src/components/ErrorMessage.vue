<template>
  <p class="errorMessage" v-if="message">{{ message }}</p>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    message: {
      type: String,
    },
  },
};
</script>

<style scoped>
.errorMessage {
  border-radius: 4px;
  box-shadow: none;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  background-color: rgb(253, 237, 237);
  padding: 6px 16px;
  color: rgb(95, 33, 32);
  text-transform: capitalize;
  margin-top: 1rem;
}
</style>
