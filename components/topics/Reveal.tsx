"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Fades content up as it enters the viewport.
 *
 * Arming happens on the DOM node rather than through React state: the markup ships visible, so
 * content stays readable with JavaScript disabled and under prefers-reduced-motion. A block is
 * only hidden once the observer confirms it starts below the fold, so nothing the reader can
 * already see gets blanked out from under them.
 */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return;

    let observer: IntersectionObserver | undefined;

    const start = () => {
      observer = new IntersectionObserver(
        (entries, self) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              if (node.dataset.armed) node.dataset.visible = "true";
              self.disconnect();
            } else if (entry.boundingClientRect.top >= window.innerHeight) {
              node.dataset.armed = "true";
            }
          }
        },
        // threshold must stay 0. A fractional threshold is a fraction of the OBSERVED ELEMENT, so a
        // block taller than the viewport can never reach it — the dossier here runs past 10,000px,
        // and at 0.08 it would need 855px of itself inside a 715px root. It would arm and never
        // unarm, leaving the page's main content permanently at opacity 0.
        { rootMargin: "0px 0px -12% 0px", threshold: 0 }
      );

      observer.observe(node);
    };

    // Wait for load before observing. Hero and plate images carry no intrinsic height until they
    // decode, so at mount the document measures far shorter than it ends up — every block reports
    // as on-screen, the observer disconnects immediately, and the reveal silently does nothing.
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      window.removeEventListener("load", start);
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="reveal" style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
