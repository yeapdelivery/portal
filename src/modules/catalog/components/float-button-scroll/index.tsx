"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";

export function ScrollToggleButton() {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      setAtBottom(nearBottom);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 p-3 bg-primary-default text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors"
      title={atBottom ? "Voltar ao topo" : "Ir até o fim"}
    >
      {atBottom ? (
        <ArrowUp size={24} weight="bold" />
      ) : (
        <ArrowDown size={24} weight="bold" />
      )}
    </button>
  );
}
