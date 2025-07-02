
import { useState, useEffect } from "react";

interface RotatingTextProps {
  className?: string;
}

const RotatingText = ({ className }: RotatingTextProps) => {
  const phrases = [
    "Är du trött på alla nej? Vi fixar ditt lån – snabbt, enkelt, godkänt.",
    "Är du trött på att bli nekad? Vi ser till att det blir ett ja. Punkt.",
    "Är du trött på att slösa tid på avslag? Vi får det gjort – utan snack.",
    "Är du trött på att aldrig bli godkänd? Vi löser det – direkt.",
    "Är du trött på att banken kör över dig? Vi vänder spelet till din fördel.",
    "Är du trött på krångliga lån och kalla nej? Vi levererar ett ja – utan omvägar.",
    "Är du trött på att kämpa i onödan? Vi får ditt lån beviljat – snabbt och säkert.",
    "Är du trött på att höra 'tyvärr'? Vi byter ut det mot ett 'grattis'.",
    "Är du trött på att bli dissad av långivare? Vi ger dig det du förtjänar – ett ja.",
    "Är du trött på att aldrig komma vidare? Vi öppnar dörren – nu."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <h1 className={className}>
      {phrases[currentIndex]}
    </h1>
  );
};

export default RotatingText;
