import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from './providers/MouseProvider';

const GradientFollower: React.FC = () => {
  const { mouseX, mouseY } = useMousePosition();

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) =>
            `radial-gradient(400px at ${x}px ${y}px, rgba(255, 165, 0, 0.1), transparent 80%)`
        ),
        willChange: 'background',
      }}
    />
  );
};

// A helper from framer-motion to use MotionValues in string templates
function useTransform<T, R>(
  values: MotionValue<T>[],
  transformer: (values: T[]) => R
): MotionValue<R> {
  // This is a simplified implementation for the sake of the example
  // In a real project, you would use the one from framer-motion
  const [latest, setLatest] = React.useState(() => transformer(values.map(v => v.get())));

  React.useEffect(() => {
    const unsubscribers = values.map(v => v.onChange(v => {
      setLatest(transformer(values.map(v => v.get())))
    }));
    return () => unsubscribers.forEach(unsub => unsub());
  }, []);

  return { get: () => latest, onChange: () => () => {}, getVelocity: () => 0, set: () => {}, clearListeners: () => {} };
}

export default GradientFollower;
