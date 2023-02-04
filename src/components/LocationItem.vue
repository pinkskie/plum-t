<template>
  <div class="location">
    <div class="location-info">
      <BurgerIcon />
      <span>{{ location.name }}</span>
    </div>
    <button @click="$emit('click')" :disabled="disabled">
      <DeleteIcon :disable="disabled" />
    </button>
  </div>
</template>

<script>
import BurgerIcon from "../assets/icons/BurgerIcon.vue";
import DeleteIcon from "../assets/icons/DeleteIcon.vue";

export default {
  name: "LocationItem",
  components: {
    DeleteIcon,
    BurgerIcon,
  },
  props: {
    location: {
      type: Object,
    },
    disabled: {
      type: Boolean,
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
</style>
