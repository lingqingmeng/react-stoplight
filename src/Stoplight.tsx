import { useEffect, useState } from 'react';

const Stoplight = () => {
  const [currentLight, setCurrentLight] = useState<'green' | 'yellow' | 'red'>('red');
  const phases: Array<{ light: 'green' | 'yellow' | 'red'; duration: number }> = [
    { light: 'green', duration: 5000 },
    { light: 'yellow', duration: 1000 },
    { light: 'red', duration: 2000 }
  ];

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const runCycle = async () => {
      while (!cancelled) {
        for (const phase of phases) {
          setCurrentLight(phase.light);
          await sleep(phase.duration);
          if (cancelled) return;
        }
      }
    };

    runCycle();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="stoplight-container">
        <div className={`light red${currentLight === 'red' ? ' active' : ''}`}></div>
        <div className={`light yellow${currentLight === 'yellow' ? ' active' : ''}`}></div>
        <div className={`light green${currentLight === 'green' ? ' active' : ''}`}></div>
      </div>
    </div>
  );
}

export default Stoplight; 