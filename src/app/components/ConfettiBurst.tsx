"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiBurst({ trigger }: { trigger: boolean }) {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount: 200,
        spread: 160,
        startVelocity: 60,
        origin: { y: 0.6 },
        scalar: 1.4,
        zIndex: 9999,
      });
    }
  }, [trigger]);

  return null;
}
