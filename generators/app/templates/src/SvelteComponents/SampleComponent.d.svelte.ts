import type { Component } from 'svelte';

export interface SampleComponentExports {
  increment(): void;
}

export interface SampleComponentProps {
  startCount: number;
}

declare const SampleComponent: Component<SampleComponentProps, SampleComponentExports>;

// eslint-disable-next-line import-x/no-default-export
export default SampleComponent;
