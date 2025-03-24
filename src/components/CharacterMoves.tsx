"use client";
import { useState, useCallback, useMemo, useRef, JSX, useEffect } from "react";
import { IMoves, IMove } from "@/types/characterDataTypes";
import React from "react";
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  Circle,
  Plus,
  Square,
  Triangle,
  X,
  ArrowsOutCardinal,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

type NotationType = "term" | "playstation" | "xbox" | "universal";
interface ICharacterMovesProps {
  moves: IMoves[];
  characterId: string;
}

interface IInputButtonProps {
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  additionalText?: string;
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
  universal: ITranslationElement;
}

const TermButton = ({ bgColor = "bg-white", textColor = "text-black", borderColor = "border-black", size = "md", children, additionalText }: IInputButtonProps) => {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
  };

  return (
    <div className="inline-flex items-center">
      <div className={`${bgColor} ${textColor} rounded-full ${borderColor} border inline-flex items-center justify-center  font-bold w-full px-2 ${sizeClasses[size]}`}>{children}</div>
      {additionalText && <span className="ml-1 text-xs tracking-wider">{additionalText}</span>}
    </div>
  );
};

const InputButton = ({ bgColor = "bg-white", textColor = "text-black", borderColor = "border-black", size = "md", children, additionalText }: IInputButtonProps) => {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
  };

  return (
    <div className="inline-flex items-center">
      <div className={`${bgColor} ${textColor} rounded-full ${borderColor} border inline-flex items-center justify-center font-bold ${sizeClasses[size]}`}>{children}</div>
      {additionalText && <span className="ml-1 text-xs tracking-wider">{additionalText}</span>}
    </div>
  );
};

const PSButton = ({ iconColor, size = "md", additionalText }: { iconColor: string; size?: "sm" | "md" | "lg"; additionalText?: string }) => {
  const iconSizes = {
    sm: 12,
    md: 15,
    lg: 18,
  };

  return (
    <div
      className={`inline-flex items-center rounded-full p-0.5 border border-black ${iconColor === "square" && "bg-fuchsia-400"} ${iconColor === "triangle" && "bg-lime-400"} ${
        iconColor === "circle" && "bg-red-400"
      } ${iconColor === "x" && "bg-blue-400"}`}
    >
      <div className="bg-black rounded-full p-1.5 border border-black inline-flex items-center justify-center">
        {iconColor === "square" && <Square size={iconSizes[size]} className="text-fuchsia-400" />}
        {iconColor === "triangle" && <Triangle size={iconSizes[size]} className="text-lime-400" />}
        {iconColor === "circle" && <Circle size={iconSizes[size]} className="text-red-400" />}
        {iconColor === "x" && <X size={iconSizes[size]} className="text-blue-400" />}
      </div>
      {additionalText && <span className="ml-1 text-xs tracking-wider">{additionalText}</span>}
    </div>
  );
};

const XboxButton = ({ button, size = "md", additionalText }: { button: string; size?: "sm" | "md" | "lg"; additionalText?: string }) => {
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const buttonColors: Record<string, string> = {
    X: "text-blue-400",
    Y: "text-amber-400",
    B: "text-red-400",
    A: "text-lime-400",
  };

  return (
    <div
      className={`inline-flex items-center font-black rounded-full p-0.5 border border-black ${button === "X" && "bg-blue-400"} ${button === "Y" && "bg-amber-400"} ${button === "B" && "bg-red-400"} ${
        button === "A" && "bg-lime-400"
      }`}
    >
      <div className="bg-black rounded-full border border-black inline-flex items-center justify-center">
        <p className={`${buttonColors[button]} px-2 py-1 ${textSizes[size]}`}>{button}</p>
      </div>
      <span></span>
      {additionalText && <span className="ml-1 font-blacktext-xs tracking-wider">{additionalText}</span>}
    </div>
  );
};

const DirectionalArrow = ({ direction, size = "md" }: { direction: string; size?: "sm" | "md" | "lg" }) => {
  const arrowSizes = {
    sm: 20,
    md: 25,
    lg: 30,
  };

  const getArrow = () => {
    switch (direction) {
      case "NORTHEAST":
        return <ArrowUpRight size={arrowSizes[size]} />;
      case "NORTHWEST":
        return <ArrowUpLeft size={arrowSizes[size]} />;
      case "SOUTHEAST":
        return <ArrowDownRight size={arrowSizes[size]} />;
      case "SOUTHWEST":
        return <ArrowDownLeft size={arrowSizes[size]} />;
      case "NORTH":
        return <ArrowUp size={arrowSizes[size]} />;
      case "SOUTH":
        return <ArrowDown size={arrowSizes[size]} />;
      case "EAST":
        return <ArrowRight size={arrowSizes[size]} />;
      case "WEST":
        return <ArrowLeft size={arrowSizes[size]} />;
      case "ANY":
        return <ArrowsOutCardinal size={arrowSizes[size]} />;
      default:
        return null;
    }
  };

  return (
    <div className={`inline-flex items-center font-black rounded-full border border-white bg-transparent`}>
      <div className="bg-transparent rounded-full border border-black inline-flex items-center justify-center">
        <InputButton bgColor="bg-white" textColor="text-black" size={size}>
          {getArrow()}
        </InputButton>
      </div>
    </div>
  );
};

const CompoundInput = ({ primary, secondary, notation, additionalText }: { primary: string; secondary: string; notation: NotationType; additionalText?: string }) => {
  return (
    <div className="inline-flex items-center bg-white my-2 rounded-full px-4 py-2 text-black font-black">
      <span>{primary}</span>
      <Plus size={15} className="mx-2" />
      {notation === "playstation" && <PSButton iconColor={secondary} />}
      {notation === "xbox" && <XboxButton button={secondary} />}
      {notation === "universal" && <span>{secondary}</span>}
      {additionalText && <span className="ml-2 font-black">{additionalText}</span>}
    </div>
  );
};

const TranslateInput = ({ input, notation, scrollableCombo = false }: ITranslateInputProps) => {
  const translations = useMemo<ITranslations>(
    () => ({
      term: {
        Q: <TermButton bgColor="bg-teal-400">Quick Attack</TermButton>,
        F: <TermButton bgColor="bg-amber-400">Flash Attack</TermButton>,
        SF: <TermButton bgColor="bg-amber-400">Special Flash Attack</TermButton>,
        SQ: <TermButton bgColor="bg-teal-400">Step Quick Attack</TermButton>,
        SI: <TermButton bgColor="bg-indigo-400">Signature Move</TermButton>,
        BK: <TermButton bgColor="bg-purple-400">Breaker</TermButton>,
        R: <TermButton bgColor="bg-white">Reverse</TermButton>,
        BR: <TermButton bgColor="bg-red-300">Burst Reverse</TermButton>,
        CR: <TermButton bgColor="bg-orange-300">Chain Reverse</TermButton>,
        SR: <TermButton bgColor="bg-blue-300">Soul Reverse</TermButton>,
        H: <TermButton bgColor="bg-pink-400">Hakugeki</TermButton>,
        KI: <TermButton bgColor="bg-pink-400">Kikon</TermButton>,
        S1: <TermButton bgColor="bg-white">Spiritual Pressure Move 1</TermButton>,
        S2: <TermButton bgColor="bg-white">Spiritual Pressure Move 2</TermButton>,
        AW: <TermButton bgColor="bg-white">Awakening</TermButton>,
        RE: <TermButton bgColor="bg-white">Reawakening</TermButton>,
        S: <TermButton bgColor="bg-white">4-Directional Step</TermButton>,
        D: <TermButton bgColor="bg-white">Dash</TermButton>,
        HH: <TermButton bgColor="bg-white">Hoho</TermButton>,
        GD: <TermButton bgColor="bg-green-400">Guard</TermButton>,
        CO: <TermButton bgColor="bg-white">Perfect Hoho Counter</TermButton>,
        NORTHEAST: <DirectionalArrow direction="NORTHEAST" />,
        NORTHWEST: <DirectionalArrow direction="NORTHWEST" />,
        SOUTHEAST: <DirectionalArrow direction="SOUTHEAST" />,
        SOUTHWEST: <DirectionalArrow direction="SOUTHWEST" />,
        NORTH: <DirectionalArrow direction="NORTH" />,
        SOUTH: <DirectionalArrow direction="SOUTH" />,
        EAST: <DirectionalArrow direction="EAST" />,
        WEST: <DirectionalArrow direction="WEST" />,
        ANY: <DirectionalArrow direction="ANY" />,
      },
      playstation: {
        Q: <PSButton iconColor="square" />,
        F: <PSButton iconColor="triangle" />,
        SF: <CompoundInput primary="LS" secondary="triangle" notation="playstation" additionalText="(In any direction)" />,
        SQ: <CompoundInput primary="LS" secondary="square" notation="playstation" additionalText="(In any direction)" />,
        SI: <PSButton iconColor="circle" />,
        BK: <InputButton bgColor="bg-gray-400">R1</InputButton>,
        R: <CompoundInput primary="L2" secondary="square" notation="playstation" />,
        BR: <CompoundInput primary="L2" secondary="square" notation="playstation" additionalText="(Whilst being hit)" />,
        CR: <CompoundInput primary="L2" secondary="square" notation="playstation" additionalText="(Whilst attacking)" />,
        SR: <CompoundInput primary="L2" secondary="square" notation="playstation" additionalText="(When not being hit / attacking)" />,
        H: <InputButton bgColor="bg-gray-400">R2 (Hold)</InputButton>,
        KI: <InputButton bgColor="bg-gray-400">R2</InputButton>,
        S1: <CompoundInput primary="L2" secondary="triangle" notation="playstation" />,
        S2: <CompoundInput primary="L2" secondary="circle" notation="playstation" />,
        AW: <CompoundInput primary="L3" secondary="R3" notation="universal" />,
        RE: <CompoundInput primary="L3" secondary="R3" notation="universal" />,
        S: <PSButton iconColor="x" />,
        D: <PSButton iconColor="x" additionalText="(Hold)" />,
        HH: <CompoundInput primary="L2" secondary="x" notation="playstation" />,
        GD: <InputButton bgColor="bg-gray-400">L1</InputButton>,
        CO: <CompoundInput primary="L2" secondary="x" notation="playstation" additionalText="(With perfect timing)" />,
        NORTHEAST: <DirectionalArrow direction="NORTHEAST" />,
        NORTHWEST: <DirectionalArrow direction="NORTHWEST" />,
        SOUTHEAST: <DirectionalArrow direction="SOUTHEAST" />,
        SOUTHWEST: <DirectionalArrow direction="SOUTHWEST" />,
        NORTH: <DirectionalArrow direction="NORTH" />,
        SOUTH: <DirectionalArrow direction="SOUTH" />,
        EAST: <DirectionalArrow direction="EAST" />,
        WEST: <DirectionalArrow direction="WEST" />,
        ANY: <DirectionalArrow direction="ANY" />,
      },
      xbox: {
        Q: <XboxButton button="X" />,
        F: <XboxButton button="Y" />,
        SF: <CompoundInput primary="LS" secondary="Y" notation="xbox" additionalText="(In any direction)" />,
        SQ: <CompoundInput primary="LS" secondary="X" notation="xbox" additionalText="(In any direction)" />,
        SI: <XboxButton button="B" />,
        BK: <InputButton bgColor="bg-gray-400">RB</InputButton>,
        R: <CompoundInput primary="LT" secondary="X" notation="xbox" />,
        BR: <CompoundInput primary="LT" secondary="X" notation="xbox" additionalText="(Whilst being hit)" />,
        CR: <CompoundInput primary="LT" secondary="X" notation="xbox" additionalText="(Whilst attacking)" />,
        SR: <CompoundInput primary="LT" secondary="X" notation="xbox" additionalText="(When not being hit / attacking)" />,
        H: <InputButton bgColor="bg-gray-400">RT (Hold)</InputButton>,
        KI: <InputButton bgColor="bg-gray-400">RT</InputButton>,
        S1: <CompoundInput primary="LT" secondary="Y" notation="xbox" />,
        S2: <CompoundInput primary="LT" secondary="B" notation="xbox" />,
        AW: <CompoundInput primary="LS" secondary="RS" notation="universal" />,
        RE: <CompoundInput primary="LS" secondary="RS" notation="universal" />,
        S: <XboxButton button="A" />,
        D: <XboxButton button="A" additionalText="(Hold)" />,
        HH: <CompoundInput primary="LT" secondary="A" notation="xbox" />,
        GD: <InputButton bgColor="bg-gray-400">LB</InputButton>,
        CO: <CompoundInput primary="LT" secondary="A" notation="xbox" additionalText="(With perfect timing)" />,
        NORTHEAST: <DirectionalArrow direction="NORTHEAST" />,
        NORTHWEST: <DirectionalArrow direction="NORTHWEST" />,
        SOUTHEAST: <DirectionalArrow direction="SOUTHEAST" />,
        SOUTHWEST: <DirectionalArrow direction="SOUTHWEST" />,
        NORTH: <DirectionalArrow direction="NORTH" />,
        SOUTH: <DirectionalArrow direction="SOUTH" />,
        EAST: <DirectionalArrow direction="EAST" />,
        WEST: <DirectionalArrow direction="WEST" />,
        ANY: <DirectionalArrow direction="ANY" />,
      },
      universal: {
        Q: <InputButton bgColor="bg-white">A</InputButton>,
        F: <InputButton bgColor="bg-white">B</InputButton>,
        SF: (
          <InputButton bgColor="bg-white" additionalText="(Or any other movement)">
            B1
          </InputButton>
        ),
        SQ: (
          <InputButton bgColor="bg-white" additionalText="(Or any other movement)">
            A1
          </InputButton>
        ),
        SI: <InputButton bgColor="bg-white">D</InputButton>,
        BK: <InputButton bgColor="bg-white">E</InputButton>,
        R: <CompoundInput primary="F" secondary="A" notation="universal" />,
        BR: <CompoundInput primary="F" secondary="D" notation="universal" additionalText="(When not SR / CR)" />,
        CR: <CompoundInput primary="F" secondary="D" notation="universal" additionalText="(Whilst attacking)" />,
        SR: <CompoundInput primary="F" secondary="D" notation="universal" additionalText="(Whilst being hit)" />,
        H: <InputButton bgColor="bg-white">H (Hold)</InputButton>,
        KI: <InputButton bgColor="bg-white">H</InputButton>,
        S1: <CompoundInput primary="F" secondary="B" notation="universal" />,
        S2: <CompoundInput primary="F" secondary="D" notation="universal" />,
        AW: <CompoundInput primary="J" secondary="I" notation="universal" />,
        RE: <CompoundInput primary="J" secondary="I" notation="universal" />,
        S: <InputButton bgColor="bg-white">C</InputButton>,
        D: (
          <InputButton bgColor="bg-white" additionalText="(Hold)">
            C
          </InputButton>
        ),
        HH: <CompoundInput primary="F" secondary="A" notation="universal" />,
        GD: <InputButton bgColor="bg-white">G</InputButton>,
        CO: <CompoundInput primary="F" secondary="A" notation="universal" additionalText="(With perfect timing)" />,
        NORTHEAST: <InputButton bgColor="bg-white">2</InputButton>,
        NORTHWEST: <InputButton bgColor="bg-white">8</InputButton>,
        SOUTHEAST: <InputButton bgColor="bg-white">4</InputButton>,
        SOUTHWEST: <InputButton bgColor="bg-white">6</InputButton>,
        NORTH: <InputButton bgColor="bg-white">1</InputButton>,
        SOUTH: <InputButton bgColor="bg-white">5</InputButton>,
        EAST: <InputButton bgColor="bg-white">3</InputButton>,
        WEST: <InputButton bgColor="bg-white">7</InputButton>,
        ANY: <InputButton bgColor="bg-white">9</InputButton>,
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
      { key: "SQ", label: "Step Quick Attack" },
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
      { key: "HH", label: "Follow-up Hoho" },
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
    <div className="w-auto flex flex-wrap flex-row mt-4">
      <div className="w-full gap-2 ml-4 text-gray-400">
        {translatedKeys.map(({ key, label }) => (
          <div key={key}>
            <TranslateInput input={key} notation={notation} /> {label}
          </div>
        ))}
      </div>
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
          {movesetKeyIsOpen && renderMovelistKey()}
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
