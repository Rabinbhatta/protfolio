"use client";

import { useState, useEffect } from "react";
import { OperatingSystem } from "@/components/operating-system";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <OperatingSystem isMobile={isMobile} />
    </main>
  );
}
