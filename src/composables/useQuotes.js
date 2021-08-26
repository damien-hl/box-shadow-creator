import { computed, ref } from "vue";

const quotes = ref([
  {
    content:
      "Make an empty space in any corner of your mind, and creativity will instantly fill it",
    author: "Dee Hock",
    link: "https://www.brainyquote.com/quotes/dee_hock_285469?src=t_empty",
  },
  {
    content: "Our life is full of empty space.",
    author: "Umberto Eco",
    link: "https://www.brainyquote.com/quotes/umberto_eco_584271?src=t_empty",
  },
  {
    content:
      "Creativity is always a leap of faith. You're faced with a blank page, blank easel, or an empty stage.",
    author: "Julia Cameron",
    link: "https://www.brainyquote.com/quotes/julia_cameron_471892?src=t_empty",
  },
  {
    content: "An empty canvas is full.",
    author: "Robert Rauschenberg",
    link: "https://www.brainyquote.com/quotes/robert_rauschenberg_348058?src=t_empty",
  },
]);

/**
 *
 * @function useQuotes
 *
 * Composable for the random quotes
 *
 * @returns {object} Public ref and methods
 */
export default function useQuotes() {
  const getRandomQuote = () =>
    computed(
      () => quotes.value[Math.round(Math.random() * (quotes.value.length - 1))]
    );

  return { quotes, getRandomQuote };
}
