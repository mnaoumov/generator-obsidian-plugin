<script lang="ts">
  import type { SampleSvelteComponentProps } from './SampleSvelteComponent.d.ts';

  let { startCount }: SampleSvelteComponentProps = $props();

  let count = $state(startCount);

  export function increment() {
    count += 1;
  }
</script>

<h4>Sample Svelte Component!</h4>

<div>
  <span>My number is {count}!</span>
</div>

<button onclick={increment}>Increment</button>