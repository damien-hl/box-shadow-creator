<script setup>
import { computed, defineAsyncComponent } from "vue";

const { width, height, name } = defineProps({
  width: {
    type: String,
    default: "24",
  },
  height: {
    type: String,
    default: "24",
  },
  name: {
    type: String,
    required: true,
    validator: (value) =>
      [
        "add",
        "alpha",
        "blur",
        "check",
        "code",
        "horizontal",
        "invisible",
        "palette",
        "pencil",
        "trash",
        "size",
        "vertical",
        "visible",
      ].includes(value),
  },
});

const Component = computed(() => {
  const iconName = name.charAt(0).toUpperCase() + name.slice(1);
  return defineAsyncComponent(() => import(`./icons/${iconName}.vue`));
});
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
  >
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </svg>
</template>

<style scoped>
/*------------------------------------*\
  # ICON
\*------------------------------------*/
.icon {
  display: block;
}

.icon:deep(path) {
  fill: currentColor;
}
</style>
