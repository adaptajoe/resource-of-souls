import { useState, useRef } from "react";

interface Badge {
  name: string;
  owner: string | null;
  lastChallenged: string | null;
}

interface BadgeWheelProps {
  badges: Badge[];
}

const BadgeWheel = ({ badges }: BadgeWheelProps) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const segmentAngle = 360 / badges.length;

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedBadge(null);

    const minRotations = 2;
    const additionalRotations = Math.floor(Math.random() * 3);
    const totalRotations = minRotations + additionalRotations;

    const randomIndex = Math.floor(Math.random() * badges.length);
    const newRotation = rotationDegree + totalRotations * 360 + randomIndex * segmentAngle;

    setRotationDegree(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedBadge(badges[randomIndex]);
    }, 5000);
  };

  const round = (num: number) => Number(num.toFixed(4));

  const getSegmentPath = (index: number) => {
    const startAngle = (index * segmentAngle * Math.PI) / 180;
    const endAngle = ((index + 1) * segmentAngle * Math.PI) / 180;

    const startX = round(50 + 50 * Math.sin(startAngle));
    const startY = round(50 - 50 * Math.cos(startAngle));
    const endX = round(50 + 50 * Math.sin(endAngle));
    const endY = round(50 - 50 * Math.cos(endAngle));

    const largeArcFlag = segmentAngle <= 180 ? "0" : "1";

    return `M50,50 L${startX},${startY} A50,50 0 ${largeArcFlag},1 ${endX},${endY}Z`;
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={spinWheel}
        className="px-4 py-2 mb-4 font-black rounded-xl text-white border-red-600 border-2 bg-red-600 hover:bg-red-800 transition-colors disabled:bg-gray-800 disabled:border-gray-800"
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </button>

      <div className="relative w-96 h-96">
        {/* Static Arrow Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M10 20 L0 0 L20 0 Z" fill="#dc2626" />
          </svg>
        </div>

        {/* Wheel Container */}
        <div
          ref={wheelRef}
          className="absolute w-full h-full rounded-full border-8 border-gray-800 overflow-hidden"
          style={{
            transform: `rotate(${rotationDegree}deg)`,
            transition: isSpinning ? "transform 5s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {badges.map((_, index) => (
              <path key={index} d={getSegmentPath(index)} fill={index % 2 === 0 ? "#1f2937" : "#374151"} />
            ))}
          </svg>
        </div>

        {/* Static Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gray-800 border-4 border-gray-700 z-10 flex items-center justify-center" />
      </div>

      {/* Selected Badge Display */}
      {selectedBadge && !isSpinning && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold">{selectedBadge.name}</p>
          {selectedBadge.owner && <p className="text-sm text-gray-400">Owned by: {selectedBadge.owner}</p>}
        </div>
      )}
    </div>
  );
};

export default BadgeWheel;
