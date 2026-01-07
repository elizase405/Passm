import React, { useEffect, useRef, useState } from "react";

const ALERT_DURATION = 20000;
const INTERVAL = 50;
const FADE_DURATION = 300;

const Alert = ({ msg }) => {
  const [progress, setProgress] = useState(15);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    const step = 100 / (ALERT_DURATION / INTERVAL);

    timerRef.current = setInterval(() => {
      if (paused) return;

      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          setFading(true);

          setTimeout(() => setVisible(false), FADE_DURATION);
          return 0;
        }
        return prev - step;
      });
    }, INTERVAL);

    return () => clearInterval(timerRef.current);
  }, [paused]);

  if (!visible) return null;

  return (
    <div
      className={`transition-opacity text-sm ${fading ? "opacity-0" : "opacity-100 z-2"}`}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Alert box */}
      <div className="absolute top-33 right-40 bg-[#050812] w-50 h-15 border border-[#00ffcc]/20 flex items-center justify-center px-4 text-white">{msg}</div>

      {/* Gradient progress bar */}
      <div
        className="absolute top-47 right-40 h-1 transition-all duration-50 ease-linear"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, #00ffcc 0%, #3b82f6 100%)"
        }}
      />
    </div>
  );
};

export default Alert;
