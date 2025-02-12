"use client";

interface AnimatedHeroProps {
  src: string;
  alt: string;
  filename: string;
}

export default function AnimatedHero({ src, alt }: AnimatedHeroProps) {
  return (
    <div className="relative w-full overflow-hidden" tabIndex={0}>
      <video autoPlay loop muted playsInline className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover border-b border-gray-400">
        <source src={src} type="video/mp4" />
        {alt}
      </video>
    </div>
  );
}
