"use client";
import { useState, useCallback, useMemo, useRef, JSX, useEffect } from "react";
import { IMoves, IMove } from "@/types/characterDataTypes";
import React from "react";
import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight, Circle, Square, Triangle, X, ArrowsOutCardinal } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

type NotationType = "term" | "playstation" | "xbox" | "pc" | "universal";
interface ICharacterMovesProps {
  moves: IMoves[];
  characterId: string;
}

interface IUnifiedButtonProps {
  primaryColor?: string;
  textColor?: string;
  borderColor?: string;
  size?: "sm" | "md" | "lg";
  primaryInput?: string;
  secondaryInput?: string;
  additionalText?: string;
  children?: React.ReactNode;
  variant?: "term" | "playstation" | "xbox" | "pc" | "universal" | "directional";
}

interface ITranslateInputProps {
  input: string | null;
  notation: NotationType;
  scrollableCombo?: boolean;
}

interface ITranslationElement {
  [key: string]: JSX.Element;
}

interface ITranslations {
  term: ITranslationElement;
  playstation: ITranslationElement;
  xbox: ITranslationElement;
  pc: ITranslationElement;
  universal: ITranslationElement;
}

const UnifiedButton = ({
  primaryColor = "bg-white",
  textColor = "text-black",
  borderColor = "border-black",
  size = "md",
  primaryInput,
  secondaryInput,
  additionalText,
  children,
  variant = "term",
}: IUnifiedButtonProps) => {
  const sizeClasses = {
    sm: "min-h-6 min-w-6 text-xs",
    md: "min-h-8 min-w-8 text-sm",
    lg: "min-h-10 min-w-10 text-base",
  };

  // PlayStation specific colors
  const psColors: Record<string, string> = {
    square: "bg-fuchsia-400",
    triangle: "bg-lime-400",
    circle: "bg-red-400",
    x: "bg-blue-400",
  };

  // Xbox specific colors
  const xboxColors: Record<string, string> = {
    X: "bg-blue-400",
    Y: "bg-amber-400",
    B: "bg-red-400",
    A: "bg-lime-400",
  };

  // PlayStation icons
  const getPSIcon = (iconName: string, iconSize: number) => {
    switch (iconName) {
      case "square":
        return <Square size={iconSize} className="text-fuchsia-400" />;
      case "triangle":
        return <Triangle size={iconSize} className="text-lime-400" />;
      case "circle":
        return <Circle size={iconSize} className="text-red-400" />;
      case "x":
        return <X size={iconSize} className="text-blue-400" />;
      default:
        return null;
    }
  };

  // Xbox icons
  const getXboxIcon = (iconName: string) => {
    switch (iconName) {
      case "A":
        return <p className={`text-lime-400`}>A</p>;
      case "B":
        return <p className="text-red-400">B</p>;
      case "X":
        return <p className="text-blue-400">X</p>;
      case "Y":
        return <p className="text-amber-400">Y</p>;
      default:
        return null;
    }
  };

  // Directional arrow icons
  const getDirectionalArrow = (direction: string, arrowSize: number) => {
    switch (direction) {
      case "NORTHEAST":
        return <ArrowUpRight size={arrowSize} />;
      case "NORTHWEST":
        return <ArrowUpLeft size={arrowSize} />;
      case "SOUTHEAST":
        return <ArrowDownRight size={arrowSize} />;
      case "SOUTHWEST":
        return <ArrowDownLeft size={arrowSize} />;
      case "NORTH":
        return <ArrowUp size={arrowSize} />;
      case "SOUTH":
        return <ArrowDown size={arrowSize} />;
      case "EAST":
        return <ArrowRight size={arrowSize} />;
      case "WEST":
        return <ArrowLeft size={arrowSize} />;
      case "ANY":
        return <ArrowsOutCardinal size={arrowSize} />;
      default:
        return null;
    }
  };

  const iconSizes = {
    sm: 12,
    md: 15,
    lg: 18,
  };

  const arrowSizes = {
    sm: 20,
    md: 25,
    lg: 30,
  };

  if (variant === "playstation" && primaryInput && psColors[primaryInput]) {
    return (
      <div className={`inline-flex items-center justify-center size-9 w-fit rounded-full p-0.5 border border-black text-black font-black ${psColors[primaryInput]}`}>
        <div className="bg-black rounded-full size-7 p-1.5 border border-black inline-flex items-center justify-center">{getPSIcon(primaryInput, iconSizes[size])}</div>
        {additionalText && <span className="mx-2 text-xs">{additionalText}</span>}
      </div>
    );
  }

  if (variant === "xbox" && primaryInput && xboxColors[primaryInput]) {
    return (
      <div className={`inline-flex items-center justify-center size-9 w-fit rounded-full p-0.5 border border-black text-black font-black ${xboxColors[primaryInput]}`}>
        <div className="bg-black rounded-full size-7 p-1.5 border border-black inline-flex items-center justify-center">{getXboxIcon(primaryInput)}</div>
        {additionalText && <span className="mx-2 text-xs">{additionalText}</span>}
      </div>
    );
  }

  if (variant === "directional" && primaryInput) {
    return (
      <div className={`inline-flex items-center justify-center font-black rounded-full border border-white bg-transparent size-9`}>
        <div className="bg-transparent size-7 rounded-full border border-black inline-flex items-center justify-center">
          <div className={`${primaryColor} ${textColor} rounded-full ${borderColor} border inline-flex items-center justify-center px-2 font-bold ${sizeClasses[size]}`}>
            {getDirectionalArrow(primaryInput, arrowSizes[size])}
          </div>
        </div>
      </div>
    );
  }

  // For compound inputs (primary + secondary)
  if (primaryInput && secondaryInput) {
    return (
      <div className="inline-flex items-center bg-white rounded-full px-2 py-2 text-black text-xs font-black gap-1">
        <span>{primaryInput}</span>
        &#x2b;
        {variant === "playstation" && <UnifiedButton primaryInput={secondaryInput} variant="playstation" size={size} />}
        {variant === "xbox" && <UnifiedButton primaryInput={secondaryInput} variant="xbox" size={size} />}
        {(variant === "universal" || variant === "pc" || variant === "term") && <span>{secondaryInput}</span>}
        {additionalText && <span className="font-black">{additionalText}</span>}
      </div>
    );
  }

  // Default button style (term or universal)
  return (
    <div className="inline-flex items-center">
      <div className={`${primaryColor} ${textColor} rounded-full ${borderColor} border inline-flex items-center justify-center min-w-10 min-h-10 font-bold w-full px-2 py-2 ${sizeClasses[size]}`}>
        {children || primaryInput}
        {additionalText && <span className="ml-1 text-xs">{additionalText}</span>}
      </div>
    </div>
  );
};

const TranslateInput = ({ input, notation, scrollableCombo = false }: ITranslateInputProps) => {
  const translations = useMemo<ITranslations>(
    () => ({
      term: {
        Q: (
          <UnifiedButton variant="term" primaryColor="bg-teal-500">
            Quick Attack
          </UnifiedButton>
        ),
        F: (
          <UnifiedButton variant="term" primaryColor="bg-cyan-500">
            Flash Attack
          </UnifiedButton>
        ),
        SF: (
          <UnifiedButton variant="term" primaryColor="bg-indigo-500">
            Special Flash Attack
          </UnifiedButton>
        ),
        SI: (
          <UnifiedButton variant="term" primaryColor="bg-lime-500">
            Signature Move
          </UnifiedButton>
        ),
        BK: (
          <UnifiedButton variant="term" primaryColor="bg-pink-500">
            Breaker
          </UnifiedButton>
        ),
        R: <UnifiedButton variant="term">Reverse</UnifiedButton>,
        BR: (
          <UnifiedButton variant="term" primaryColor="bg-blue-500">
            Burst Reverse
          </UnifiedButton>
        ),
        CR: (
          <UnifiedButton variant="term" primaryColor="bg-yellow-500">
            Chain Reverse
          </UnifiedButton>
        ),
        SR: <UnifiedButton variant="term">Soul Reverse</UnifiedButton>,
        H: (
          <UnifiedButton variant="term" primaryColor="bg-fuchsia-500">
            Hakugeki
          </UnifiedButton>
        ),
        KI: (
          <UnifiedButton variant="term" primaryColor="bg-fuchsia-500">
            Kikon
          </UnifiedButton>
        ),
        S1: (
          <UnifiedButton variant="term" primaryColor="bg-red-500">
            Spiritual Pressure Move 1
          </UnifiedButton>
        ),
        S2: (
          <UnifiedButton variant="term" primaryColor="bg-red-500">
            Spiritual Pressure Move 2
          </UnifiedButton>
        ),
        AW: <UnifiedButton variant="term">Awakening</UnifiedButton>,
        RE: <UnifiedButton variant="term">Reawakening</UnifiedButton>,
        S: <UnifiedButton variant="term">4-Directional Step</UnifiedButton>,
        D: <UnifiedButton variant="term">Dash</UnifiedButton>,
        HH: (
          <UnifiedButton variant="term" primaryColor="bg-orange-500">
            Follow-up Hohō
          </UnifiedButton>
        ),
        GD: <UnifiedButton variant="term">Guard</UnifiedButton>,
        CO: <UnifiedButton variant="term">Counter</UnifiedButton>,
        NORTHEAST: <UnifiedButton primaryInput="NORTHEAST" variant="directional" />,
        NORTHWEST: <UnifiedButton primaryInput="NORTHWEST" variant="directional" />,
        SOUTHEAST: <UnifiedButton primaryInput="SOUTHEAST" variant="directional" />,
        SOUTHWEST: <UnifiedButton primaryInput="SOUTHWEST" variant="directional" />,
        NORTH: <UnifiedButton primaryInput="NORTH" variant="directional" />,
        SOUTH: <UnifiedButton primaryInput="SOUTH" variant="directional" />,
        EAST: <UnifiedButton primaryInput="EAST" variant="directional" />,
        WEST: <UnifiedButton primaryInput="WEST" variant="directional" />,
        ANY: <UnifiedButton primaryInput="ANY" variant="directional" />,
      },
      playstation: {
        Q: <UnifiedButton primaryInput="square" variant="playstation" />,
        F: <UnifiedButton primaryInput="triangle" variant="playstation" />,
        SF: <UnifiedButton primaryInput="LS" secondaryInput="triangle" variant="playstation" additionalText="(In any direction)" />,
        SI: <UnifiedButton primaryInput="circle" variant="playstation" />,
        BK: (
          <UnifiedButton primaryColor="bg-gray-400" variant="term">
            R1
          </UnifiedButton>
        ),
        R: <UnifiedButton primaryInput="L2" secondaryInput="square" variant="playstation" />,
        BR: <UnifiedButton primaryInput="L2" secondaryInput="square" variant="playstation" additionalText="(Whilst being hit)" />,
        CR: <UnifiedButton primaryInput="L2" secondaryInput="square" variant="playstation" additionalText="(Whilst attacking)" />,
        SR: <UnifiedButton primaryInput="L2" secondaryInput="square" variant="playstation" additionalText="(When not being hit / attacking)" />,
        H: (
          <UnifiedButton primaryColor="bg-gray-400" additionalText="(Hold)" variant="term">
            R2
          </UnifiedButton>
        ),
        KI: (
          <UnifiedButton primaryColor="bg-gray-400" variant="term">
            R2
          </UnifiedButton>
        ),
        S1: <UnifiedButton primaryInput="L2" secondaryInput="triangle" variant="playstation" />,
        S2: <UnifiedButton primaryInput="L2" secondaryInput="circle" variant="playstation" />,
        AW: <UnifiedButton primaryInput="L3" secondaryInput="R3" variant="universal" />,
        RE: <UnifiedButton primaryInput="L3" secondaryInput="R3" variant="universal" />,
        S: <UnifiedButton primaryInput="x" variant="playstation" />,
        D: <UnifiedButton primaryInput="x" variant="playstation" additionalText="(Hold)" />,
        HH: <UnifiedButton primaryInput="L2" secondaryInput="x" variant="playstation" />,
        GD: (
          <UnifiedButton primaryColor="bg-gray-400" variant="term">
            L1
          </UnifiedButton>
        ),
        CO: <UnifiedButton primaryInput="L2" secondaryInput="x" variant="playstation" additionalText="(With perfect timing)" />,
        NORTHEAST: <UnifiedButton primaryInput="NORTHEAST" variant="directional" />,
        NORTHWEST: <UnifiedButton primaryInput="NORTHWEST" variant="directional" />,
        SOUTHEAST: <UnifiedButton primaryInput="SOUTHEAST" variant="directional" />,
        SOUTHWEST: <UnifiedButton primaryInput="SOUTHWEST" variant="directional" />,
        NORTH: <UnifiedButton primaryInput="NORTH" variant="directional" />,
        SOUTH: <UnifiedButton primaryInput="SOUTH" variant="directional" />,
        EAST: <UnifiedButton primaryInput="EAST" variant="directional" />,
        WEST: <UnifiedButton primaryInput="WEST" variant="directional" />,
        ANY: <UnifiedButton primaryInput="ANY" variant="directional" />,
      },
      xbox: {
        Q: <UnifiedButton primaryInput="X" variant="xbox" />,
        F: <UnifiedButton primaryInput="Y" variant="xbox" />,
        SF: <UnifiedButton primaryInput="LS" secondaryInput="Y" variant="xbox" additionalText="(In any direction)" />,
        SI: <UnifiedButton primaryInput="B" variant="xbox" />,
        BK: (
          <UnifiedButton primaryColor="bg-gray-400" variant="term">
            RB
          </UnifiedButton>
        ),
        R: <UnifiedButton primaryInput="LT" secondaryInput="X" variant="xbox" />,
        BR: <UnifiedButton primaryInput="LT" secondaryInput="X" variant="xbox" additionalText="(Whilst being hit)" />,
        CR: <UnifiedButton primaryInput="LT" secondaryInput="X" variant="xbox" additionalText="(Whilst attacking)" />,
        SR: <UnifiedButton primaryInput="LT" secondaryInput="X" variant="xbox" additionalText="(When not being hit / attacking)" />,
        H: (
          <UnifiedButton primaryColor="bg-gray-400" variant="term">
            RT (Hold)
          </UnifiedButton>
        ),
        KI: (
          <UnifiedButton primaryColor="bg-gray-400" variant="term">
            RT
          </UnifiedButton>
        ),
        S1: <UnifiedButton primaryInput="LT" secondaryInput="Y" variant="xbox" />,
        S2: <UnifiedButton primaryInput="LT" secondaryInput="B" variant="xbox" />,
        AW: <UnifiedButton primaryInput="LS" secondaryInput="RS" variant="universal" />,
        RE: <UnifiedButton primaryInput="LS" secondaryInput="RS" variant="universal" />,
        S: <UnifiedButton primaryInput="A" variant="xbox" />,
        D: <UnifiedButton primaryInput="A" variant="xbox" additionalText="(Hold)" />,
        HH: <UnifiedButton primaryInput="LT" secondaryInput="A" variant="xbox" />,
        GD: (
          <UnifiedButton primaryColor="bg-gray-400" variant="term">
            LB
          </UnifiedButton>
        ),
        CO: <UnifiedButton primaryInput="LT" secondaryInput="A" variant="xbox" additionalText="(With perfect timing)" />,
        NORTHEAST: <UnifiedButton primaryInput="NORTHEAST" variant="directional" />,
        NORTHWEST: <UnifiedButton primaryInput="NORTHWEST" variant="directional" />,
        SOUTHEAST: <UnifiedButton primaryInput="SOUTHEAST" variant="directional" />,
        SOUTHWEST: <UnifiedButton primaryInput="SOUTHWEST" variant="directional" />,
        NORTH: <UnifiedButton primaryInput="NORTH" variant="directional" />,
        SOUTH: <UnifiedButton primaryInput="SOUTH" variant="directional" />,
        EAST: <UnifiedButton primaryInput="EAST" variant="directional" />,
        WEST: <UnifiedButton primaryInput="WEST" variant="directional" />,
        ANY: <UnifiedButton primaryInput="ANY" variant="directional" />,
      },
      pc: {
        Q: <UnifiedButton variant="term">Left Mouse Click</UnifiedButton>,
        F: <UnifiedButton variant="term">Right Mouse Click</UnifiedButton>,
        SF: <UnifiedButton additionalText="(Or any other movement)" variant="term" primaryInput="W/A/S/D" secondaryInput="Right Mouse Click" />,
        SI: <UnifiedButton variant="term">Middle Mouse Click</UnifiedButton>,
        BK: <UnifiedButton variant="term">Q</UnifiedButton>,
        R: <UnifiedButton primaryInput="Tab" secondaryInput="Left Mouse Click" variant="universal" />,
        BR: <UnifiedButton primaryInput="Tab" secondaryInput="Left Mouse Click" variant="universal" additionalText="(When not SR / CR)" />,
        CR: <UnifiedButton primaryInput="Tab" secondaryInput="Left Mouse Click" variant="universal" additionalText="(Whilst attacking)" />,
        SR: <UnifiedButton primaryInput="Tab" secondaryInput="Left Mouse Click" variant="universal" additionalText="(Whilst being hit)" />,
        H: <UnifiedButton variant="term">R (Hold)</UnifiedButton>,
        KI: <UnifiedButton variant="term">R</UnifiedButton>,
        S1: <UnifiedButton primaryInput="Tab" secondaryInput="Right Mouse Click" variant="universal" />,
        S2: <UnifiedButton primaryInput="Tab" secondaryInput="Middle Mouse Click" variant="universal" />,
        AW: <UnifiedButton primaryInput="LShift" secondaryInput="B" variant="universal" />,
        RE: <UnifiedButton primaryInput="LShift" secondaryInput="B" variant="universal" />,
        S: <UnifiedButton variant="term">X</UnifiedButton>,
        D: (
          <UnifiedButton additionalText="(Hold)" variant="term">
            X
          </UnifiedButton>
        ),
        HH: <UnifiedButton primaryInput="Tab" secondaryInput="X" variant="universal" />,
        GD: <UnifiedButton variant="term">E</UnifiedButton>,
        CO: <UnifiedButton primaryInput="Tab" secondaryInput="X" variant="universal" additionalText="(With perfect timing)" />,
        NORTHEAST: <UnifiedButton variant="term" primaryInput="W" secondaryInput="D" />,
        NORTHWEST: <UnifiedButton variant="term" primaryInput="W" secondaryInput="A" />,
        SOUTHEAST: <UnifiedButton variant="term" primaryInput="S" secondaryInput="D" />,
        SOUTHWEST: <UnifiedButton variant="term" primaryInput="S" secondaryInput="A" />,
        NORTH: <UnifiedButton variant="term">W</UnifiedButton>,
        SOUTH: <UnifiedButton variant="term">S</UnifiedButton>,
        EAST: <UnifiedButton variant="term">D</UnifiedButton>,
        WEST: <UnifiedButton variant="term">A</UnifiedButton>,
        ANY: <UnifiedButton variant="term">W/A/S/D</UnifiedButton>,
      },
      universal: {
        Q: <UnifiedButton variant="term">A</UnifiedButton>,
        F: <UnifiedButton variant="term">B</UnifiedButton>,
        SF: (
          <UnifiedButton additionalText="(Or any other movement)" variant="term">
            B1
          </UnifiedButton>
        ),
        SI: <UnifiedButton variant="term">D</UnifiedButton>,
        BK: <UnifiedButton variant="term">E</UnifiedButton>,
        R: <UnifiedButton primaryInput="F" secondaryInput="A" variant="universal" />,
        BR: <UnifiedButton primaryInput="F" secondaryInput="D" variant="universal" additionalText="(When not SR / CR)" />,
        CR: <UnifiedButton primaryInput="F" secondaryInput="D" variant="universal" additionalText="(Whilst attacking)" />,
        SR: <UnifiedButton primaryInput="F" secondaryInput="D" variant="universal" additionalText="(Whilst being hit)" />,
        H: <UnifiedButton variant="term">H (Hold)</UnifiedButton>,
        KI: <UnifiedButton variant="term">H</UnifiedButton>,
        S1: <UnifiedButton primaryInput="F" secondaryInput="B" variant="universal" />,
        S2: <UnifiedButton primaryInput="F" secondaryInput="D" variant="universal" />,
        AW: <UnifiedButton primaryInput="J" secondaryInput="I" variant="universal" />,
        RE: <UnifiedButton primaryInput="J" secondaryInput="I" variant="universal" />,
        S: <UnifiedButton variant="term">C</UnifiedButton>,
        D: (
          <UnifiedButton additionalText="(Hold)" variant="term">
            C
          </UnifiedButton>
        ),
        HH: <UnifiedButton primaryInput="F" secondaryInput="A" variant="universal" />,
        GD: <UnifiedButton variant="term">G</UnifiedButton>,
        CO: <UnifiedButton primaryInput="F" secondaryInput="A" variant="universal" additionalText="(With perfect timing)" />,
        NORTHEAST: <UnifiedButton variant="term">2</UnifiedButton>,
        NORTHWEST: <UnifiedButton variant="term">8</UnifiedButton>,
        SOUTHEAST: <UnifiedButton variant="term">4</UnifiedButton>,
        SOUTHWEST: <UnifiedButton variant="term">6</UnifiedButton>,
        NORTH: <UnifiedButton variant="term">1</UnifiedButton>,
        SOUTH: <UnifiedButton variant="term">5</UnifiedButton>,
        EAST: <UnifiedButton variant="term">3</UnifiedButton>,
        WEST: <UnifiedButton variant="term">7</UnifiedButton>,
        ANY: <UnifiedButton variant="term">9</UnifiedButton>,
      },
    }),
    []
  );

  const [isMounted, setIsMounted] = useState(false);
  const sortedKeys = useMemo(() => Object.keys(translations[notation]).sort((a, b) => b.length - a.length), [translations, notation]);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (input && input.includes("->")) {
      const steps = input.split(/\s*->\s*/);
      itemRefs.current = new Array(steps.length).fill(null);
    }
  }, [input]);

  // Your existing drawArrows function here
  // Update the drawArrows function to handle scrollable mode
  const drawArrows = useCallback(() => {
    if (!input || !input.includes("->") || !containerRef.current || !svgRef.current) return;

    // Clear any existing arrows
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }

    // Add arrowhead marker definition
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");

    marker.setAttribute("markerWidth", "5");
    marker.setAttribute("markerHeight", "3.5");
    marker.setAttribute("refX", "5");
    marker.setAttribute("refY", "1.75");
    marker.setAttribute("orient", "auto");

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", "0 0, 5 1.75, 0 3.5");
    polygon.setAttribute("fill", "#2dd4bf"); // teal-400

    marker.appendChild(polygon);
    defs.appendChild(marker);
    svgRef.current.appendChild(defs);

    // Get all step elements
    const steps = itemRefs.current.filter(Boolean);

    if (scrollableCombo) {
      // For scrollable mode, draw a single straight line through all steps
      if (steps.length >= 2) {
        // Calculate the middle Y position
        const containerRect = containerRef.current.getBoundingClientRect();
        const middleY = containerRect.height / 2;

        // Draw a line from the first step to the last step
        const firstStep = steps[0];
        const lastStep = steps[steps.length - 1];

        if (firstStep && lastStep) {
          const firstRect = firstStep.getBoundingClientRect();
          const lastRect = lastStep.getBoundingClientRect();

          const startX = firstRect.right - containerRect.left;
          const endX = lastRect.left - containerRect.left;

          // Create a single line
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", startX.toString());
          line.setAttribute("y1", middleY.toString());
          line.setAttribute("x2", endX.toString());
          line.setAttribute("y2", middleY.toString());
          line.setAttribute("stroke", "#2dd4bf"); // teal-400
          line.setAttribute("stroke-width", "3");

          svgRef.current.appendChild(line);
        }
      }
    } else {
      // Original behavior for non-scrollable mode
      // Draw arrows between each step
      for (let i = 0; i < steps.length - 1; i++) {
        const currentStep = steps[i];
        const nextStep = steps[i + 1];

        if (!currentStep || !nextStep) continue;

        // Get positions relative to the container
        const currentRect = currentStep.getBoundingClientRect();
        const nextRect = nextStep.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        // Calculate start and end points
        const startX = currentRect.right - containerRect.left;
        const startY = currentRect.top + currentRect.height / 2 - containerRect.top;
        const endX = nextRect.left - containerRect.left;
        const endY = nextRect.top + nextRect.height / 2 - containerRect.top;

        // Check if the next element is on a new line
        const isNewLine = nextRect.top > currentRect.bottom || endX < startX;

        // For new line transitions, we need to ensure the arrow points in the right direction
        if (isNewLine) {
          // First path: from current element to just before the next element (without arrow)
          const mainPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
          const containerWidth = containerRect.width;

          mainPath.setAttribute(
            "d",
            `
          M ${startX},${startY} 
          L ${containerWidth - 20},${startY}
          C ${containerWidth - 10},${startY} ${containerWidth - 10},${startY + (endY - startY) / 2} ${containerWidth - 20},${startY + (endY - startY) / 2}
          L ${20},${startY + (endY - startY) / 2}
          C ${0},${startY + (endY - startY) / 2} ${10},${endY} ${20},${endY}
          L ${endX + 20},${endY}
        `
          );

          mainPath.setAttribute("stroke", "#2dd4bf"); // teal-400
          mainPath.setAttribute("stroke-width", "3");
          mainPath.setAttribute("fill", "none");

          // Add paths to SVG
          svgRef.current.appendChild(mainPath);
        } else {
          // For same line transitions, add a line with some extra length
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", `M ${startX},${startY} L ${endX},${endY}`);

          // Style the arrow
          path.setAttribute("stroke", "#2dd4bf"); // teal-400
          path.setAttribute("stroke-width", "3");
          path.setAttribute("fill", "none");

          // Add to SVG
          svgRef.current.appendChild(path);
        }
      }
    }
  }, [input, scrollableCombo]);

  const attemptDrawArrows = useCallback(() => {
    drawArrows();
    const delays = [50, 100, 250, 500, 1000];
    delays.forEach((delay) => {
      setTimeout(() => {
        if (containerRef.current && svgRef.current) {
          drawArrows();
        }
      }, delay);
    });
  }, [drawArrows]);

  useEffect(() => {
    if (isMounted && input && input.includes("->")) {
      attemptDrawArrows();
    }
  }, [isMounted, input, notation, scrollableCombo, attemptDrawArrows]);

  useEffect(() => {
    window.addEventListener("resize", drawArrows);
    return () => {
      window.removeEventListener("resize", drawArrows);
    };
  }, [drawArrows]);

  // Draw arrows on mount and when relevant dependencies change
  useEffect(() => {
    // Wait for next frame to ensure all elements are properly rendered
    const timer = setTimeout(() => {
      drawArrows();
    }, 0);

    // Add resize listener to redraw arrows when window size changes
    window.addEventListener("resize", drawArrows);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", drawArrows);
    };
  }, [drawArrows, input, notation]);

  useEffect(() => {
    const handleRedraw = () => {
      if (input && input.includes("->")) {
        attemptDrawArrows();
      }
    };

    window.addEventListener("redrawArrows", handleRedraw);

    return () => {
      window.removeEventListener("redrawArrows", handleRedraw);
    };
  }, [input, attemptDrawArrows]);

  if (!input) return null;

  // Check if this is a combo (contains "->")
  if (input.includes("->")) {
    // Split by the arrow pattern "-> "
    const steps = input.split(/\s*->\s*/);

    return (
      <div ref={containerRef} className={`flex flex-wrap items-center gap-2 col-span-2 relative p-1 ${!scrollableCombo ? "w-full" : "w-full flex flex-row flex-nowrap overflow-x-scroll"}`}>
        {/* SVG overlay for arrows */}
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            zIndex: 1,
            overflow: "visible",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />

        {steps.map((step, index) => {
          const trimmedStep = step.trim();

          // For each step, parse it using the original logic
          const stepParts = trimmedStep.split(new RegExp(`(${sortedKeys.join("|")}|[+\\-])`, "g"));

          return (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`inline-flex items-center relative z-10 bg-transparent py-0.5 rounded ${scrollableCombo ? "flex-shrink-0" : ""}`}
              data-step-index={index}
            >
              {/* Render the move */}
              <span className="flex-shrink-0">
                {stepParts.map((part, partIndex) => (
                  <span className="" key={partIndex}>
                    {translations[notation][part] || part}
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  const parts = input.split(new RegExp(`(${sortedKeys.join("|")}|[+\\-])`, "g"));
  return (
    <div className={scrollableCombo ? "flex overflow-x-auto" : ""}>
      {parts.map((part, index) => (
        <span className="mx-0.5" key={index}>
          {translations[notation][part] || part}
        </span>
      ))}
    </div>
  );
};

const formatMoveTag = (tag: string): string => {
  const specialCases: { [key: string]: string } = {
    sp1: "SP1",
    sp2: "SP2",
  };

  if (tag.toLowerCase() in specialCases) {
    return specialCases[tag.toLowerCase()];
  }

  const withSpaces = tag.replace(/([A-Z])/g, " $1");
  const withSpacesBeforeNumbers = withSpaces.replace(/(\d+)/g, " $1");
  const cleaned = withSpacesBeforeNumbers.replace(/\s+/g, " ").trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

const CharacterMoves = ({ moves, characterId }: ICharacterMovesProps) => {
  const [activeTab, setActiveTab] = useState<"base" | "awakened" | "reawakened" | "weakened" | "kikon" | "baseCombos" | "awakenedCombos" | "reawakenedCombos" | "weakenedCombos">("base");
  const [movesetKeyIsOpen, setMovesetKeyIsOpen] = useState(false);
  const [notation, setNotation] = useState<NotationType>("term");
  const [scrollableCombo, setScrollableCombo] = useState(false);

  useEffect(() => {
    // Create a small delay to ensure DOM has updated
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("redrawArrows"));
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const hasAwakening = useMemo(() => moves.some((category) => category.awakened && category.awakened.length > 0), [moves]);
  const hasReawakening = useMemo(() => moves.some((category) => category.reawakened && category.reawakened.length > 0), [moves]);
  const hasWeakened = useMemo(() => moves.some((category) => category.weakened && category.weakened.length > 0), [moves]);

  const handleTabClick = useCallback((tab: "base" | "awakened" | "reawakened" | "weakened" | "kikon" | "baseCombos" | "awakenedCombos" | "reawakenedCombos" | "weakenedCombos") => {
    setActiveTab(tab);
  }, []);

  const handleNotationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNotation(event.target.value as NotationType);
  };

  const translatedKeys = useMemo(() => {
    return [
      { key: "Q", label: "Quick Attack" },
      { key: "F", label: "Flash Attack" },
      { key: "SF", label: "Special Flash Attack" },
      { key: "SI", label: "Signature Move" },
      { key: "BK", label: "Breaker" },
      { key: "R", label: "Reverse" },
      { key: "BR", label: "Burst Reverse" },
      { key: "CR", label: "Chain Reverse" },
      { key: "SR", label: "Soul Reverse" },
      { key: "H", label: "Hakugeki" },
      { key: "KI", label: "Kikon Move" },
      { key: "S1", label: "Spiritual Pressure Move 1" },
      { key: "S2", label: "Spiritual Pressure Move 2" },
      { key: "AW", label: "Awakening" },
      { key: "RE", label: "Reawakening" },
      { key: "S", label: "4-Directional Step" },
      { key: "D", label: "Dash" },
      { key: "HH", label: "Follow-up Hohō" },
      { key: "GD", label: "Guard" },
      { key: "CO", label: "Counter" },
      { key: "NORTHEAST", label: "Up-Right" },
      { key: "NORTHWEST", label: "Up-Left" },
      { key: "SOUTHEAST", label: "Down-Right" },
      { key: "SOUTHWEST", label: "Down-Left" },
      { key: "NORTH", label: "Up" },
      { key: "SOUTH", label: "Down" },
      { key: "EAST", label: "Right" },
      { key: "WEST", label: "Left" },
      { key: "ANY", label: "Any" },
    ];
  }, [notation]);

  const renderMovelistKey = () => (
    <div className="w-auto border-b-2 border-gray-400 grid grid-cols-4 text-center p-2 pt-4 pb-6">
      {translatedKeys.map(({ key, label }) => (
        <div key={key} className="border border-gray-400 h-full p-2 py-4 flex justify-center items-center flex-col rounded-xl">
          <TranslateInput input={key} notation={notation} /> {label}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative">
      <div>
        <div className="flex flex-col flex-wrap items-left w-full p-2 pt-0 mb-4">
          <div className="grid grid-cols-2 items-center">
            <label className="col-span-2 md:col-span-1 font-bold text-teal-400 flex items-center gap-2 ml-2">
              Notation Style:
              <select value={notation} onChange={handleNotationChange} className="ml-2 p-1 bg-gray-800 w-full sm:w-fit text-white rounded">
                <option value="term">Term Notation</option>
                <option value="playstation">PlayStation Notation</option>
                <option value="xbox">Xbox Notation</option>
                <option value="pc">PC Default Notation</option>
                <option value="universal">Universal Notation</option>
              </select>
            </label>
            <div className="col-span-2 md:col-span-1 justify-self-end mr-4 mt-4 md:mt-0">
              <div className="flex items-center">
                <span className="text-sm text-gray-300 truncate">Scrollable Combo Inputs</span>
                <input type="checkbox" checked={scrollableCombo} onChange={() => setScrollableCombo((prev) => !prev)} className="ml-2 h-4 w-4 accent-teal-500" />
              </div>
            </div>
          </div>

          <hr className="my-4 w-full" />
          <button className="font-bold text-teal-400 flex items-center gap-2 ml-2 mt-2" onClick={() => setMovesetKeyIsOpen((prevState) => !prevState)}>
            Click to {movesetKeyIsOpen ? "hide Movelist Key" : "show Movelist Key"}
            {movesetKeyIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
          </button>
          <div>{movesetKeyIsOpen && renderMovelistKey()}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 pl-4 border-b border-b-gray-400 overflow-x-scroll">
        <button
          className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "base" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
          onClick={() => handleTabClick("base")}
        >
          Base
        </button>
        {hasAwakening && (
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "awakened" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
            onClick={() => handleTabClick("awakened")}
          >
            Awakened
          </button>
        )}
        {hasReawakening && (
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "reawakened" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
            onClick={() => handleTabClick("reawakened")}
          >
            Reawakened
          </button>
        )}
        {hasWeakened && (
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "weakened" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
            onClick={() => handleTabClick("weakened")}
          >
            Weakened
          </button>
        )}
        <button
          className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "kikon" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
          onClick={() => handleTabClick("kikon")}
        >
          Kikon
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "baseCombos" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
          onClick={() => handleTabClick("baseCombos")}
        >
          Base Combos
        </button>
        {hasAwakening && (
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "awakenedCombos" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
            onClick={() => handleTabClick("awakenedCombos")}
          >
            Awakened Combos
          </button>
        )}
        {hasReawakening && (
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "reawakenedCombos" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
            onClick={() => handleTabClick("reawakenedCombos")}
          >
            Reawakened Combos
          </button>
        )}
        {hasWeakened && (
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "weakenedCombos" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
            onClick={() => handleTabClick("weakenedCombos")}
          >
            Weakened Combos
          </button>
        )}
      </div>

      {/* Content */}
      <div>
        {moves.map((moveCategory, categoryIndex) => (
          <div key={categoryIndex} className="h-fit bg-gray-700">
            {activeTab === "base" &&
              moveCategory.base.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} scrollableCombo={scrollableCombo} />)}

            {activeTab === "awakened" &&
              moveCategory.awakened?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} scrollableCombo={scrollableCombo} />)}

            {activeTab === "reawakened" &&
              moveCategory.reawakened?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} scrollableCombo={scrollableCombo} />)}

            {activeTab === "weakened" &&
              moveCategory.weakened?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} scrollableCombo={scrollableCombo} />)}

            {activeTab === "kikon" &&
              moveCategory.kikon.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} scrollableCombo={scrollableCombo} />)}

            {activeTab === "baseCombos" &&
              moveCategory.baseCombos.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} scrollableCombo={scrollableCombo} />)}

            {activeTab === "awakenedCombos" &&
              moveCategory.awakenedCombos?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} scrollableCombo={scrollableCombo} />)}

            {activeTab === "reawakenedCombos" &&
              moveCategory.reawakenedCombos?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} scrollableCombo={scrollableCombo} />)}

            {activeTab === "weakenedCombos" &&
              moveCategory.weakenedCombos?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} scrollableCombo={scrollableCombo} />)}
          </div>
        ))}
      </div>
    </div>
  );
};

interface IMoveDisplayProps {
  move: IMove;
  characterId: string;
  notation: NotationType;
  scrollableCombo: boolean;
}

const MoveDisplay = ({ move, characterId, notation, scrollableCombo }: IMoveDisplayProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isExpanded && move.input && move.input.includes("->")) {
      // Dispatch a custom event to trigger redrawing
      window.dispatchEvent(new CustomEvent("redrawArrows"));
    }
  }, [isExpanded, move.input]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current && isVideoLoaded) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setVideoError(true);
        });
      }
    }
  }, [isVideoLoaded]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const encodedMoveId = encodeURIComponent(move.id);

  return (
    <div
      className="border-b border-gray-400 bg-black hover:bg-gray-900 transition-colors last:mb-0 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
      tabIndex={0}
      role="button"
    >
      {/* Top bar */}
      <div className="grid grid-cols-3 border-b border-r border-gray-400 border-l-8 border-l-red-600">
        <div className="flex flex-col col-span-3 md:col-span-1 items-start justify-center ml-4">
          <div className="flex items-center">
            <span className={`transform ${isExpanded ? "rotate-180" : ""} mr-2`}>▼</span>
            <p
              className={`font-bebasFont text-base tracking-wider py-2 mr-2 ${move.name !== "Unknown" && move.hasOfficialName ? "text-white" : undefined} ${
                move.name === "Unknown" && "text-red-600"
              } ${!move.hasOfficialName && "text-amber-400"}`}
            >
              {move.name}
            </p>
          </div>
        </div>
        <div className="flex flex-row col-span-3 md:col-span-2 items-center justify-start md:justify-end mr-2 mb-4 ml-8 md:ml-0 md:mb-0">
          {!move.input ? null : (
            <div className={`${scrollableCombo ? "max-w-full overflow-x-auto" : "max-w-full"} my-1`}>
              <TranslateInput input={move.input} notation={notation} scrollableCombo={scrollableCombo} />
            </div>
          )}
        </div>
      </div>

      {/* Collapsible content */}
      <div className={`transition-all duration-300 ${isExpanded ? "block" : "hidden"}`}>
        {/* Middle */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-400">
          <div className="border-r border-gray-400 p-8 px-4 text-gray-400 italic text-sm">
            <p>&quot;{move.description}&quot;</p>
          </div>
          <div className="p-4">
            <div className="flex flex-col h-full relative items-center justify-center">
              <Image
                src={`/assets/character-animations/${characterId}/${encodedMoveId}.png`}
                alt={`${move.name} first frame`}
                width={300}
                height={300}
                className={`w-fit border-2 border-gray-400 block ${isHovered && !videoError ? "grayscale" : ""}`}
                onError={(e) => {
                  e.currentTarget.src = "/assets/character-animations/placeholder.png";
                }}
              />

              {!videoError && (
                <video
                  ref={videoRef}
                  width={300}
                  height={300}
                  className={`absolute top-0 left-0 border-2 border-gray-400 w-full h-full object-cover transition-opacity duration-200 ${
                    isHovered && isVideoLoaded ? "opacity-100 border-red-600" : "opacity-0"
                  }`}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedData={handleVideoLoaded}
                  onError={() => setVideoError(true)}
                >
                  <source src={`/assets/character-animations/${characterId}/${encodedMoveId}.mp4`} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Tags */}
        <div className="grid grid-cols-2">
          <div className="flex flex-row flex-wrap p-2 h-fit">
            {(() => {
              const hasAnyStats =
                move.reishiGain !== null ||
                move.reishiCost !== null ||
                move.reiatsuGain !== null ||
                move.reiatsuCost !== null ||
                move.fightingSpiritGain !== null ||
                move.fightingSpiritCost !== null ||
                move.reversalGain !== null ||
                move.reversalCost !== null ||
                move.resourceGain !== null ||
                move.resourceCost !== null ||
                move.damage !== null ||
                move.hits !== null ||
                move.frames !== null ||
                move.cooldown !== "X Seconds";

              if (!hasAnyStats) {
                return <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">No Move Stats</strong>;
              }

              return (
                <>
                  {move.reishiGain !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reishi Gain: {move.reishiGain}</strong>}
                  {move.reishiCost !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reishi Cost: {move.reishiCost}</strong>}
                  {move.reiatsuGain !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reiatsu Gain: {move.reiatsuGain}</strong>}
                  {move.reiatsuCost !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reiatsu Cost: {move.reiatsuCost}</strong>}
                  {move.fightingSpiritGain !== null && (
                    <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Fighting Spirit Gain: {move.fightingSpiritGain}%</strong>
                  )}
                  {move.fightingSpiritCost !== null && (
                    <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Fighting Spirit Cost: {move.fightingSpiritCost}%</strong>
                  )}
                  {move.reversalGain !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reversal Gain: {move.reversalGain}%</strong>}
                  {move.reversalCost !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reversal Cost: {move.reversalCost}%</strong>}
                  {move.resourceGain !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Resource Gain: {move.resourceGain}</strong>}
                  {move.resourceCost !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Resource Cost: {move.resourceCost}</strong>}
                  {move.damage !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Damage: {move.damage}</strong>}
                  {move.hits !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Hits: {move.hits}</strong>}
                  {move.frames !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Frames: {move.frames}</strong>}
                  {move.cooldown !== "X Seconds" && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Cooldown: {move.cooldown}</strong>}
                </>
              );
            })()}
          </div>
          <div className="flex text-xs flex-row flex-wrap border-l h-fit border-gray-400 p-2">
            {move.moveTags.map((tag, index) => (
              <strong key={index} className="bg-black border-gray-400 border text-gray-400 m-1 px-2 py-1">
                {formatMoveTag(tag)}
              </strong>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterMoves;
