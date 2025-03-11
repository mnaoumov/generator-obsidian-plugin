import { useState } from 'react';
import { useApp } from './AppContext.ts';

export interface SampleReactComponentProps {
  startCount: number;
}

export const SampleReactComponent = (props: SampleReactComponentProps) => {
  const [count, setCount] = useState(props.startCount);
  const app = useApp();

  function increment() {
    setCount(count + 1);
  }

  return (
    <>
      <h4>Sample React Component!</h4>

      <div>
        <span>My number is {count}!</span>
      </div>

      <button onClick={increment}>Increment</button>
      <div>Vault name: {app.vault.getName()}</div>
    </>
  );
};
