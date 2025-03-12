import type { JSX } from 'react';

import { useApp } from 'obsidian-dev-utils/obsidian/React/AppContext';
import { useState } from 'react';

export interface SampleReactComponentProps {
  startCount: number;
}

export function SampleReactComponent(props: SampleReactComponentProps): JSX.Element {
  const [count, setCount] = useState(props.startCount);
  const app = useApp();

  function increment(): void {
    setCount(count + 1);
  }

  return (
    <>
      <h4>Sample React Component!</h4>

      <div>
        <span>
          My number is {count}
          !
        </span>
      </div>

      <button onClick={increment}>Increment</button>
      <div>
        Vault name: {app.vault.getName()}
      </div>
    </>
  );
}
