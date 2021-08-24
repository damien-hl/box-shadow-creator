import { onMounted, ref } from "vue";

const isSupported = ref(false);

/**
 *
 * @function useClipboard
 *
 * Composable for the navigator clipboard
 *
 * @returns {object} Public ref and methods
 */
export default function useClipboard() {
  onMounted(async () => {
    const { state } = await navigator.permissions.query({
      name: "clipboard-write",
    });

    isSupported.value = state === "granted";
  });

  /**
   * @function copyText
   *
   * Write text to the clipboard's navigator
   *
   * @param {string} text The text to copy
   *
   * @returns {Promise<void>}
   */
  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  return { isSupported, copyText };
}
