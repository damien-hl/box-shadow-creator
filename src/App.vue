<script setup>
import { ref } from "vue";
import useBoxShadow from "@/composables/useBoxShadow";
import Layer from "@/components/Layer.vue";
import Preview from "@/components/Preview.vue";
import Quote from "@/components/Quote.vue";

const { layers, visibleLayers, addLayer, deleteLayer } = useBoxShadow();

const aside = ref(null);

const backgroundColor = ref("#ffffff");

/**
 * @function scrollToLayer
 *
 * Scroll to the new layer
 *
 * @param {HTMLElement} layer
 *
 * @returns {void}
 */
const scrollToLayer = (layer) => {
  if (layer.offsetTop + layer.clientHeight > aside.value.clientHeight) {
    aside.value.scrollTo({
      behavior: "smooth",
      top: layer.offsetTop,
    });
  }
};
</script>

<template>
  <div class="layout">
    <header>
      <a href="/" class="header-home-link">
        <span class="title">Box Shadow</span>
        <span class="subtitle">Creator</span>
      </a>
    </header>
    <main>
      <div class="main-content">
        <transition name="fade" mode="out-in">
          <Preview v-if="visibleLayers.length" />
          <Quote v-else />
        </transition>
      </div>
    </main>
    <aside>
      <div class="aside-header">
        <button @click="addLayer()" class="button">
          <span class="label">Add shadow layer</span>
          <span class="icon"><Icon name="add" /></span>
        </button>
      </div>
      <div ref="aside" class="aside-body">
        <transition name="switch" mode="out-in">
          <div v-if="layers.length" class="layers">
            <transition-group name="layer">
              <Layer
                v-for="layer in layers"
                :key="layer.id"
                :layer="layer"
                @added="scrollToLayer"
                @delete="deleteLayer"
              />
            </transition-group>
          </div>
          <p v-else class="message">Click <em>Add shadow layer</em> to start</p>
        </transition>
      </div>
    </aside>
    <footer>
      <label for="background" class="footer-field">
        <span class="label">background</span>
        <input
          v-model="backgroundColor"
          type="color"
          name="background"
          id="background"
        />
      </label>
    </footer>
  </div>
</template>

<style>
/*------------------------------------*\
  # ROOT
\*------------------------------------*/
:root {
  --clr-primary: hsl(215, 65%, 53%);
  --clr-secondary: hsl(191, 100%, 50%);
  --clr-black: hsl(0, 0%, 0%);
  --clr-darker: hsl(0, 0%, 10%);
  --clr-dark: hsl(227, 56%, 8%);
  --clr-medium: hsl(0, 0%, 50%);
  --clr-light: hsl(0, 0%, 97%);
  --clr-lighter: hsl(0, 0%, 90%);
  --clr-white: hsl(0, 0%, 100%);
}

/*------------------------------------*\
  # LAYOUT
\*------------------------------------*/
.layout {
  min-height: 100vh;
  display: grid;
  color: var(--clr-dark);
  background-color: var(--clr-light);
}

.layout > header {
  grid-area: header;
}

.layout > main {
  grid-area: main;
}

.layout > aside {
  grid-area: aside;
}

.layout > footer {
  grid-area: footer;
}

/*------------------------------------*\
  # HEADER
\*------------------------------------*/
header {
  display: flex;
  align-items: center;
  background-color: var(--clr-light);
}

.header-home-link {
  text-decoration: none;
}

.header-home-link .title {
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  font-variation-settings: "wght" 700;
  color: var(--clr-dark);
  background: var(--clr-primary);
  background: linear-gradient(
    to right,
    var(--clr-secondary) 0%,
    var(--clr-primary) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-home-link .subtitle {
  margin-left: 0.25rem;
  font-size: 12px;
  line-height: 16px;
  font-weight: 300;
  font-variation-settings: "wght" 300;
  color: var(--clr-darker);
}

/*------------------------------------*\
  # MAIN
\*------------------------------------*/
main {
  background-color: v-bind(backgroundColor);
}

main .main-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

/*------------------------------------*\
  # ASIDE
\*------------------------------------*/
aside {
  background-color: var(--clr-light);
}

/*------------------------------------*\
  # ASIDE > HEADER
\*------------------------------------*/
.aside-header {
  padding: 0.5rem 1rem;
  line-height: 16px;
}

.aside-header .button {
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

.aside-header .button.disabled {
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
}

.aside-header .button::before {
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

.aside-header .label {
  line-height: 2rem;
}

.aside-header .icon {
  margin-left: 0.5rem;
  transition: opacity 200ms;
}

.aside-header .button:hover {
  background-position: right center;
}

.aside-header .button:focus {
  outline: none;
}

.aside-header .button:focus::before {
  opacity: 1;
}

/*------------------------------------*\
  # ASIDE > BODY
\*------------------------------------*/
.aside-body {
  position: relative;
  overflow-y: scroll;
}

.aside-body > * {
  margin-left: 8px;
}

.aside-body .message {
  font-size: 14px;
  text-align: center;
}

.aside-body .message em {
  color: var(--clr-primary);
}

/*------------------------------------*\
  # FOOTER
\*------------------------------------*/
footer {
  display: flex;
  align-items: center;
  background-color: var(--clr-light);
}

.footer-field {
  display: inline-block;
  position: relative;
  text-decoration: none;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
}

.footer-field .label {
  font-size: 12px;
  line-height: 16px;
  font-weight: 300;
  font-variation-settings: "wght" 300;
  color: var(--clr-darker);
}

.footer-field input {
  visibility: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
}

/*------------------------------------*\
  # VUE ANIMATIONS
\*------------------------------------*/
.layer-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.layer-enter-active {
  transition: all 0.4s ease;
}

.layer-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.layer-leave-active {
  transition: all 200ms ease;
  position: absolute;
}

.layer-move {
  transition: all 200ms ease;
}

.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.switch-enter-active {
  transition: all 200ms ease;
}

.switch-leave-active {
  transition: all 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 100ms ease;
}

/*------------------------------------*\
  # ASIDE > SCROLLBAR SUPPORT
\*------------------------------------*/
@supports (scrollbar-width: thin) {
  .aside-body {
    scrollbar-width: thin;
    scrollbar-color: var(--clr-primary) var(--clr-light);
  }
}

@supports not (scrollbar-width: thin) {
  .aside-body::-webkit-scrollbar {
    width: 8px;
  }

  .aside-body::-webkit-scrollbar-track {
    background-color: var(--clr-light);
  }

  .aside-body::-webkit-scrollbar-thumb {
    background-color: var(--clr-primary);
  }
}

/*------------------------------------*\
  # FONT SUPPORT
\*------------------------------------*/
@supports (font-variation-settings: "wght" 400) {
  .layout {
    font-family: InterVariable, sans-serif;
  }
}

@supports not (font-variation-settings: "wght" 400) {
  .layout {
    font-family: Inter, sans-serif;
  }
}

/*------------------------------------*\
  # RESPONSIVE
\*------------------------------------*/
@media (max-width: 767.98px) {
  /*------------------------------------*\
    # LAYOUT
  \*------------------------------------*/
  .layout {
    grid-template-columns: 1fr;
    grid-template-rows: 32px 1fr 400px 32px;
    grid-template-areas:
      "header"
      "main"
      "aside"
      "footer";
  }

  /*------------------------------------*\
    # HEADER
  \*------------------------------------*/
  header {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--clr-lighter);
  }

  /*------------------------------------*\
    # ASIDE > BODY
  \*------------------------------------*/
  .aside-body {
    height: calc(400px - 3.5rem);
  }

  /*------------------------------------*\
    # FOOTER
  \*------------------------------------*/
  footer {
    padding: 0.5rem 1rem;
    border-top: 1px solid var(--clr-lighter);
  }
}

@media (min-width: 768px) {
  /*------------------------------------*\
    # LAYOUT
  \*------------------------------------*/
  .layout {
    grid-template-columns: 1fr 400px;
    grid-template-rows: 32px 1fr 32px;
    grid-template-areas:
      "header aside"
      "main aside"
      "footer aside";
  }

  /*------------------------------------*\
    # HEADER
  \*------------------------------------*/
  header {
    padding: 0.5rem 1rem;
  }

  /*------------------------------------*\
    # MAIN
  \*------------------------------------*/
  main {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid var(--clr-lighter);
  }

  /*------------------------------------*\
    # ASIDE > BODY
  \*------------------------------------*/
  .aside-body {
    height: calc(100vh - 3.5rem);
  }

  /*------------------------------------*\
    # FOOTER
  \*------------------------------------*/
  footer {
    padding: 0.5rem 2rem;
  }
}
</style>
