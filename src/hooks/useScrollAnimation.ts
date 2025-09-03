'use client';

import { useEffect, useRef } from 'react';

export default function useScrollAnimation(
  animationClass: string = 'animate-fade-in-up',
  delay: number = 0,
  threshold: number = 0.1
) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            // Apply delay if specified
            if (delay > 0) {
              setTimeout(() => {
                target.style.opacity = '1';
                target.classList.add(animationClass);
              }, delay * 1000);
            } else {
              target.style.opacity = '1';
              target.classList.add(animationClass);
            }
            // Unobserve after animation triggers
            observer.unobserve(target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element comes into view
      }
    );

    // Start hidden
    element.style.opacity = '0';
    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [animationClass, delay, threshold]);

  return elementRef;
}

// Hook for staggered animations
export function useStaggeredScrollAnimation(
  itemCount: number,
  animationClass: string = 'animate-fade-in-up',
  staggerDelay: number = 0.1,
  threshold: number = 0.1
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const items = target.querySelectorAll('.scroll-stagger-item');
            
            items.forEach((item, index) => {
              const element = item as HTMLElement;
              setTimeout(() => {
                element.style.opacity = '1';
                element.classList.add(animationClass);
              }, index * staggerDelay * 1000);
            });
            
            observer.unobserve(target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Hide all stagger items initially
    const items = container.querySelectorAll('.scroll-stagger-item');
    items.forEach((item) => {
      (item as HTMLElement).style.opacity = '0';
    });

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [itemCount, animationClass, staggerDelay, threshold]);

  return containerRef;
}
