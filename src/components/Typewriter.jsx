import { useState, useEffect } from 'react';

export default function Typewriter({ phrases, startDelay = 0, typingSpeed = 60, deletingSpeed = 30, pauseTime = 2500 }) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('waiting'); // 'waiting', 'typing', 'paused', 'deleting'
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    let timeout;
    
    if (phase === 'waiting') {
      timeout = setTimeout(() => {
        setPhase('typing');
      }, startDelay);
    } else if (phase === 'typing') {
      const currentPhrase = phrases[phraseIndex];
      if (text.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        setPhase('paused');
      }
    } else if (phase === 'paused') {
      timeout = setTimeout(() => {
        setPhase('deleting');
      }, pauseTime);
    } else if (phase === 'deleting') {
      const currentPhrase = phrases[phraseIndex];
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        setPhraseIndex(prev => (prev + 1) % phrases.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime, startDelay]);

  return (
    <span style={{ position: 'relative' }}>
      {text}
      <span style={{ 
        position: 'absolute', 
        right: '-6px',
        top: '5%',
        bottom: '5%',
        width: '2px', 
        background: 'var(--gold)',
        animation: 'typewriterBlink 1s step-end infinite' 
      }} />
    </span>
  );
}
