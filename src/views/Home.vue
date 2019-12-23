<template>
  <div class="home">
    <div class="page-container">
        <WelcomeQuiz />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WelcomeQuiz from '@/components/WelcomeQuiz.vue';

@Component({
  components: {
    WelcomeQuiz,
  },
})

export default class Home extends Vue {}

</script>