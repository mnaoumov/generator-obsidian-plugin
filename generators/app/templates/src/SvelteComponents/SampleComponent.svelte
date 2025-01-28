<script lang="ts">
  import type { SampleComponentProps } from './SampleComponent.d.ts';

  let { startCount }: SampleComponentProps = $props();

  let count = $state(startCount);

  export function increment() {
    count += 1;
  }
</script>

<div class="number">
  <span>My number is {count}!</span>
</div>

<style>
  .number {
    color: red;
  }
</style>
