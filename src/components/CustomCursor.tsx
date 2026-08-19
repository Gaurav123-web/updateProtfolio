import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement;
      setHovering(!!el.closest('a, button, [data-cursor]'));
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block transition-transform duration-200 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${clicking ? 0.7 : hovering ? 1.8 : 1})`,
        }}
      >
        <div
          className="rounded-full border transition-all duration-200"
          style={{
            width: hovering ? 40 : 28,
            height: hovering ? 40 : 28,
            borderColor: hovering ? '#5eead4' : 'rgba(94,234,212,0.4)',
            borderWidth: hovering ? 2 : 1,
          }}
        />
      </div>
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block transition-opacity duration-150"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          opacity: hovering ? 0 : 1,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#5eead4]" />
      </div>
    </>
  );
}
