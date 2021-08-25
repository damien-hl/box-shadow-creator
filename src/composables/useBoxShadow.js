import { computed, reactive, ref } from "vue";
import { hexToRgb } from "@/utils/color";
import { rawToUnit } from "@/utils/unit";

const boxShadow = reactive({
  id: Date.now(),
  name: "My box shadow #1",
  layers: [
    {
      id: Date.now(),
      name: "layer #1",
      x: "0",
      y: "8",
      blur: "10",
      spread: "1",
      color: "#000000",
      opacity: "0.14",
      visible: true,
    },
    {
      id: Date.now() + 1,
      name: "layer #2",
      x: "0",
      y: "3",
      blur: "14",
      spread: "2",
      color: "#000000",
      opacity: "0.12",
      visible: true,
    },
    {
      id: Date.now() + 2,
      name: "layer #3",
      x: "0",
      y: "5",
      blur: "5",
      spread: "-3",
      color: "#000000",
      opacity: "0.2",
      visible: true,
    },
  ],
});

/**
 *
 * @function useBoxShadow
 *
 * Composable for the box shadow layers
 *
 * @returns {object} Public ref and methods
 */
export default function useBoxShadow() {
  const layers = computed(() => boxShadow.layers);

  const count = ref(layers.value.length);

  const visibleLayers = computed(() =>
    layers.value.filter((layer) => layer.visible)
  );

  const layersStyle = computed(() =>
    visibleLayers.value.map(
      (layer) =>
        `${rawToUnit(layer.x)} ${rawToUnit(layer.y)} ${rawToUnit(
          layer.blur
        )} ${rawToUnit(layer.spread)} ${hexToRgb(layer.color, layer.opacity)}`
    )
  );

  /**
   * @function addLayer
   *
   * Adds a new layer
   *
   * @param {object} newLayer The layer that will be added
   *
   * @returns {void}
   */
  const addLayer = (
    newLayer = {
      x: "4",
      y: "4",
      blur: "20",
      spread: "0",
      color: "#000000",
      opacity: "0.25",
      visible: true,
    }
  ) => {
    boxShadow.layers = [
      ...boxShadow.layers,
      {
        id: Date.now(),
        name: `layer #${++count.value}`,
        ...newLayer,
      },
    ];
  };

  /**
   * @function deleteLayer
   *
   * Delete a layer with a given ID
   *
   * @param {number} id The layer ID
   *
   * @returns {void}
   */
  const deleteLayer = (id) => {
    boxShadow.layers = [...boxShadow.layers.filter((layer) => layer.id !== id)];
  };

  return {
    boxShadow,
    layers,
    visibleLayers,
    layersStyle,
    addLayer,
    deleteLayer,
  };
}
