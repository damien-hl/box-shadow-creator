<script setup>
import { onMounted, ref, toRef } from "vue";

const props = defineProps({
  layer: {
    type: Object,
    required: true,
    validator(value) {
      return [
        "id",
        "x",
        "y",
        "blur",
        "spread",
        "color",
        "opacity",
        "visible",
      ].every((property) => Object.keys(value).includes(property));
    },
  },
});

const layer = toRef(props, "layer");

const emit = defineEmits(["added", "delete"]);

const layerElement = ref(null);

const fieldId = (field) => `${field}-${layer.value.id}`;

onMounted(() => {
  emit("added", layerElement.value);
});
</script>

<template>
  <div ref="layerElement" class="layer" :class="{ disabled: !layer.visible }">
    <div class="layer-header">
      <label :for="fieldId('title')" class="field">
        <input v-model="layer.name" type="text" :id="fieldId('title')" />
      </label>

      <button class="button">
        <span @click="layer.visible = !layer.visible" class="icon">
          <Icon v-if="layer.visible" width="20" height="20" name="invisible" />
          <Icon v-else width="20" height="20" name="visible" />
        </span>
      </button>

      <button @click="emit('delete', layer.id)" class="button">
        <span class="icon">
          <Icon width="20" height="20" name="trash" />
        </span>
      </button>
    </div>
    <div class="layer-body">
      <label :for="fieldId('x')" class="field">
        <span class="icon">
          <Icon width="20" height="20" name="horizontal" />
        </span>
        <input v-model="layer.x" type="number" :id="fieldId('x')" />
        <span class="unit">px</span>
      </label>

      <label :for="fieldId('y')" class="field">
        <span class="icon">
          <Icon width="20" height="20" name="vertical" />
        </span>
        <input v-model="layer.y" type="number" :id="fieldId('y')" />
        <span class="unit">px</span>
      </label>

      <label :for="fieldId('blur')" class="field">
        <span class="icon">
          <Icon width="20" height="20" name="blur" />
        </span>
        <input v-model="layer.blur" type="number" :id="fieldId('blur')" />
        <span class="unit">px</span>
      </label>

      <label :for="fieldId('spread')" class="field">
        <span class="icon">
          <Icon width="20" height="20" name="size" />
        </span>
        <input v-model="layer.spread" type="number" :id="fieldId('spread')" />
        <span class="unit">px</span>
      </label>

      <label :for="fieldId('color')" class="field">
        <span class="icon">
          <Icon width="20" height="20" name="palette" />
        </span>
        <input v-model="layer.color" type="color" :id="fieldId('color')" />
        <span :style="{ backgroundColor: layer.color }" class="preview"></span>
      </label>

      <label :for="fieldId('opacity')" class="field">
        <span class="icon">
          <Icon width="20" height="20" name="alpha" />
        </span>
        <input
          v-model="layer.opacity"
          type="range"
          min="0"
          max="1"
          step="0.01"
          :id="fieldId('opacity')"
        />
        <span class="value">{{ layer.opacity }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
/*------------------------------------*\
  # LAYER
\*------------------------------------*/
.layer {
  padding: 1rem;
}

.layer:hover .layer-header {
  background-position: right center;
}

.layer.disabled .layer-body {
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
}

/*------------------------------------*\
  # LAYER > HEADER
\*------------------------------------*/
.layer-header {
  padding-left: 1rem;
  padding-right: 0.375rem;
  display: flex;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-image: linear-gradient(
    to right,
    var(--clr-secondary) 0%,
    var(--clr-primary) 51%,
    var(--clr-secondary) 100%
  );
  background-size: 200% auto;
  transition: background-position 200ms;
}

.layer-header .field {
  flex: 1;
  display: block;
}

.layer-header input {
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  font-size: 14px;
  font-weight: 700;
  font-variation-settings: "wght" 700;
  color: var(--clr-light);
}

.layer-header input:focus {
  outline: none;
}

.layer-header .button {
  padding: 0.375rem 0.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
}

.layer-header .icon {
  color: var(--clr-light);
  opacity: 0.75;
  transition: opacity 200ms;
}

.layer-header .button:hover .icon {
  opacity: 1;
}

.layer-header .button:focus {
  outline: none;
}

.layer-header .button:focus .icon {
  opacity: 1;
}

/*------------------------------------*\
  # LAYER > BODY
\*------------------------------------*/
.layer-body {
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 32px;
  column-gap: 1rem;
  row-gap: 0.75rem;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: #ffffff;
  transition: opacity 200ms;
}

.layer-body .field {
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background-color: var(--clr-light);
  font-size: 14px;
  color: var(--clr-dark);
}

.layer-body .field:last-child {
  grid-column: 1 / 3;
}

.layer-body .field:focus-within .icon {
  color: var(--clr-primary);
}

.layer-body .icon {
  padding: 0.375rem 0.5rem;
  transition: color 200ms;
}

.layer-body input[type="number"] {
  width: 100%;
  flex: 1;
  border: 0;
  background-color: transparent;
  text-align: right;
}

.layer-body input[type="color"] {
  position: absolute;
  visibility: hidden;
}

.layer-body input[type="range"] {
  width: 100%;
  display: inline-block;
}

.layer-body input:focus {
  outline: none;
}

.layer-body .unit {
  margin-right: 0.5rem;
  width: 2ch;
  text-align: right;
}

.layer-body .value {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: 6ch;
  text-align: right;
}

.layer-body .preview {
  margin-right: 0.5rem;
  width: 100%;
  height: 24px;
  display: inline-block;
  border-radius: 4px;
}
</style>
