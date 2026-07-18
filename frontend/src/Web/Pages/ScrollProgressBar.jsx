import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollProgressBar() {
  const [scroll, setScroll] = useState(1);
  const [showButton ] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        totalHeight > 0
          ? Math.max(
            1,
            (window.scrollY / totalHeight) * 100
          )
          : 1;

      setScroll(progress);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className=" fixed bottom-6 right-6 w-16 h-16 rounded-full bg-orange-500 text-white shadow-2xl flex flex-col items-center  justify-center z-[99999] hover:scale-110 hover:bg-orange-600 transition-all duration-300"
        >
          <FaArrowUp className="text-lg mb-1" />

          <span className="text-xs font-bold">
            {Math.round(scroll)}%
          </span>
        </button>
      )}
    </>
  );
}

export default ScrollProgressBar;