import { useState, useEffect, useRef } from 'react';

const SYMBOLS = '!<>-_\\/[]{}=+*^?#~@$%&0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

type KineticTextScrambleProps = {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  triggerOnMount?: boolean;
  scrambleColor?: string;
};

export function KineticTextScramble({
  text,
  className = '',
  triggerOnHover = true,
  triggerOnMount = false,
  scrambleColor = 'text-elevate-orange',
}: KineticTextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const isMountedRef = useRef(false);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    const chars = text.split('');
    const length = chars.length;
    let iteration = 0;
    const maxIterations = length * 3;

    const interval = setInterval(() => {
      setDisplayText(() =>
        chars
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < Math.floor(iteration / 3)) {
              return text[index];
            }
            return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 25);
  };

  useEffect(() => {
    setDisplayText(text);
    if (triggerOnMount && !isMountedRef.current) {
      isMountedRef.current = true;
      startScramble();
    }
  }, [text, triggerOnMount]);

  return (
    <span
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      className={`inline-block transition-colors duration-150 ${
        isScrambling ? scrambleColor : ''
      } ${className}`}
      data-cursor="glitch"
    >
      {displayText}
    </span>
  );
}
