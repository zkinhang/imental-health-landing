"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GuidedScroll() {
  useEffect(() => {
    // Smooth scroll configuration
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    // Create a timeline for page load
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    // Animate navigation on load
    tl.from("nav", {
      y: -100,
      opacity: 0,
      duration: 0.5,
    });

    // Progress indicator
    gsap.to(".progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Parallax effect for background elements
    gsap.utils.toArray<HTMLElement>(".parallax-slow").forEach((element) => {
      gsap.to(element, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * Number(target.dataset.speed || 0.1),
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });

    // Stagger animations for cards with delay
    const staggerItems = gsap.utils.toArray<HTMLElement>(".stagger-item");
    
    staggerItems.forEach((element, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
        delay: (index % 3) * 0.08, // Stagger within groups of 3
      });
    });

    // Pin effect for dashboard section
    const dashboardSection = document.querySelector("#dashboard-preview");
    if (dashboardSection) {
      ScrollTrigger.create({
        trigger: dashboardSection,
        start: "top top",
        end: "+=500",
        pin: false, // Can enable pinning if desired
        scrub: 1,
      });
    }

    // Scale effect for buttons on hover via ScrollTrigger
    gsap.utils.toArray<HTMLElement>("button").forEach((button) => {
      const hoverTween = gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        paused: true,
        ease: "power2.out",
      });

      button.addEventListener("mouseenter", () => hoverTween.play());
      button.addEventListener("mouseleave", () => hoverTween.reverse());
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-gray-200/30 dark:bg-gray-800/30">
        <div 
          className="progress-bar h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 origin-left scale-x-0"
        />
      </div>
    </>
  );
}
