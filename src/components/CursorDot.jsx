import { useEffect, useState } from 'react';

export default function CursorDot() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const overCheck = (e) => {
      const target = e.target.closest('a, button, .tile');
      setHovering(!!target);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', overCheck);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', overCheck);
    };
  }, []);

  return (
    <div
      className={`cursor-dot ${hovering ? 'hovering' : ''}`}
      style={{ left: pos.x, top: pos.y }}
      aria-hidden="true"
    />
  );
}
