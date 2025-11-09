"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerWrapperProps {
  children: ReactNode;
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "reveal";
  delay?: number;
  duration?: number;
  start?: string;
  end?: string;
  scrub?: boolean;
  pin?: boolean;
  markers?: boolean;
}

export default function ScrollTriggerWrapper({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 0.5,
  start = "top 90%",
  end = "bottom 20%",
  scrub = false,
  pin = false,
  markers = false,
}: ScrollTriggerWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationProps: gsap.TweenVars = {};

    switch (animation) {
      case "fadeIn":
        gsap.set(element, { opacity: 0 });
        animationProps = { opacity: 1 };
        break;
      case "slideUp":
        gsap.set(element, { opacity: 0, y: 40 });
        animationProps = { opacity: 1, y: 0 };
        break;
      case "slideLeft":
        gsap.set(element, { opacity: 0, x: 50 });
        animationProps = { opacity: 1, x: 0 };
        break;
      case "slideRight":
        gsap.set(element, { opacity: 0, x: -50 });
        animationProps = { opacity: 1, x: 0 };
        break;
      case "scale":
        gsap.set(element, { opacity: 0, scale: 0.97 });
        animationProps = { opacity: 1, scale: 1 };
        break;
      case "reveal":
        gsap.set(element, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
        animationProps = { opacity: 1, clipPath: "inset(0 0% 0 0)" };
        break;
    }

    const tween = gsap.to(element, {
      ...animationProps,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: scrub ? 1 : false,
        pin,
        markers,
        toggleActions: scrub ? undefined : "play none none reverse",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animation, delay, duration, start, end, scrub, pin, markers]);

  return <div ref={elementRef}>{children}</div>;
}
