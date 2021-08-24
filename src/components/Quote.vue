<script setup>
import useQuotes from "@/composables/useQuotes";

const { getRandomQuote } = useQuotes();

const quote = getRandomQuote();
</script>

<template>
  <figure class="quote">
    <blockquote :cite="quote.link">
      <p>{{ quote.content }}</p>
    </blockquote>
    <figcaption>—{{ quote.author }}</figcaption>
  </figure>
</template>

<style scoped>
/*------------------------------------*\
  # QUOTE
\*------------------------------------*/
.quote {
  margin: 0;
}

.quote p {
  font-size: 14px;
  line-height: 16px;
  color: var(--clr-dark);
}

.quote figcaption {
  float: right;
  font-size: 14px;
  line-height: 16px;
  color: var(--clr-primary);
}
</style>
