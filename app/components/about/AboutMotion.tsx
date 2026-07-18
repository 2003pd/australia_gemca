"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMotion() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-about-reveal]", { y: 48, opacity: 0 });
      gsap.utils.toArray<HTMLElement>("[data-about-reveal]").forEach((element) => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-about-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 34, opacity: 0, rotateX: 4 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
            },
          }
        );

        const lift = gsap.quickTo(card, "y", { duration: 0.28, ease: "power2.out" });
        const rotate = gsap.quickTo(card, "rotateX", { duration: 0.28, ease: "power2.out" });

        const enter = () => {
          lift(-8);
          rotate(1.5);
        };
        const leave = () => {
          lift(0);
          rotate(0);
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
      });

      gsap.utils.toArray<HTMLElement>("[data-about-count]").forEach((counter) => {
        const target = Number(counter.dataset.aboutTarget);
        const suffix = counter.dataset.aboutSuffix ?? "";
        const state = { value: 0 };

        gsap.to(state, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            counter.textContent = `${Math.round(state.value)}${suffix}`;
          },
        });
      });

      gsap.to(".about-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      const hero = document.querySelector<HTMLElement>("[data-about-hero]");
      const crystal = document.querySelector<HTMLElement>(".about-hero-3d");

      if (hero && crystal) {
        const moveX = gsap.quickTo(crystal, "x", { duration: 0.5, ease: "power3.out" });
        const moveY = gsap.quickTo(crystal, "y", { duration: 0.5, ease: "power3.out" });
        const rotateY = gsap.quickTo(crystal, "rotateY", { duration: 0.5, ease: "power3.out" });
        const rotateX = gsap.quickTo(crystal, "rotateX", { duration: 0.5, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const rect = hero.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;

          moveX(px * 34);
          moveY(py * 24);
          rotateY(px * 16);
          rotateX(py * -10);
        };

        const onLeave = () => {
          moveX(0);
          moveY(0);
          rotateY(0);
          rotateX(0);
        };

        hero.addEventListener("pointermove", onMove);
        hero.addEventListener("pointerleave", onLeave);
      }
    });

    return () => ctx.revert();
  }, []);

  return <div className="about-progress-bar fixed left-0 top-0 z-[10001] h-1 w-full origin-left scale-x-0 bg-[#d4af37]" />;
}
