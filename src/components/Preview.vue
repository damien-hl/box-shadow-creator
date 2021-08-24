<script setup>
import { computed, ref } from "vue";
import useLayers from "@/composables/useLayers";
import useClipboard from "@/composables/useClipboard";

const { layersStyle } = useLayers();

const boxShadowStyle = computed(() => layersStyle.value.join(", "));

const { isSupported, copyText } = useClipboard();

const copied = ref(false);

const copyToClipboard = async (e) => {
  try {
    await copyText(`box-shadow: ${boxShadowStyle.value};`);
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <div class="preview">
    <div class="preview-body">
      <div class="property"><code>box-shadow:</code></div>
      <div class="value">
        <span>
          <span v-for="(layer, index) in layersStyle" :key="layer + index">
            <code>{{ layer }}</code>
            <br v-if="index !== layersStyle.length - 1" />
            <code v-else>;</code>
          </span>
        </span>
      </div>
    </div>
    <div class="preview-footer">
      <button
        @click="copyToClipboard"
        class="button"
        :class="{ disabled: !isSupported }"
      >
        <span class="label">Copy to clipboard</span>
        <span class="icon">
          <transition name="fade" mode="out-in">
            <Icon v-if="!copied" name="code" />
            <Icon v-else name="check" />
          </transition>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.preview {
  padding: 1rem;
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 6px;
  box-shadow: v-bind(boxShadowStyle);
  background-color: var(--clr-white);
  transition: box-shadow 200ms;
}

.preview-body {
  padding: 1rem;
  flex: 1;
  border-radius: 6px;
  background-color: var(--clr-light);
  overflow-y: auto;
}

.preview-body .property {
  margin-bottom: 1rem;
  font-size: 16px;
  line-height: 20px;
}

.preview-body .value {
  display: flex;
  justify-content: center;
}

.preview-body .value code {
  font-size: 16px;
  line-height: 24px;
}

.preview-footer {
  margin-top: 1rem;
}

.preview-footer .button {
  padding: 0.25rem 1rem;
  width: 100%;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 6px;
  background-image: linear-gradient(
    to right,
    var(--clr-secondary) 0%,
    var(--clr-primary) 51%,
    var(--clr-secondary) 100%
  );
  background-size: 200% auto;
  font-size: 14px;
  line-height: inherit;
  color: var(--clr-light);
  cursor: pointer;
  transition: background-position 200ms;
}

.preview-footer .button.disabled {
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
}

.preview-footer .button::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  border-radius: 6px;
  box-shadow: 0 0 0 3px hsla(215, 65%, 53%, 0.25);
  transition: opacity 500ms;
}

.preview-footer .label {
  line-height: 2rem;
}

.preview-footer .icon {
  margin-left: 0.5rem;
  overflow: hidden;
  transition: all 200ms;
}

.preview-footer .button:hover {
  background-position: right center;
}

.preview-footer .button:focus {
  outline: none;
}

.preview-footer .button:focus::before {
  opacity: 1;
}

/*------------------------------------*\
  # ASIDE > SCROLLBAR SUPPORT
\*------------------------------------*/
@supports (scrollbar-width: thin) {
  .preview-body {
    scrollbar-width: thin;
    scrollbar-color: var(--clr-primary) var(--clr-light);
  }
}

@supports not (scrollbar-width: thin) {
  .preview-body::-webkit-scrollbar {
    width: 8px;
  }

  .preview-body::-webkit-scrollbar-track {
    background-color: var(--clr-light);
  }

  .preview-body::-webkit-scrollbar-thumb {
    background-color: var(--clr-primary);
  }
}

/*------------------------------------*\
  # FONT SUPPORT
\*------------------------------------*/
@supports (font-variation-settings: "wght" 400) {
  .preview code {
    font-family: "Fira CodeVariable", sans-serif;
  }
}

@supports not (font-variation-settings: "wght" 400) {
  .preview code {
    font-family: "Fira Code", sans-serif;
  }
}
</style>
