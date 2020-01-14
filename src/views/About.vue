<template>
  <div class="about">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AboutView extends Vue {
    @Prop() private msg!: string
}

</script>
