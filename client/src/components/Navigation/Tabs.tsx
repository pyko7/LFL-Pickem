import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Tabs = ({
  children,
  position,
}: {
  children?: ReactNode;
  position: number;
}) => {
  const [scrollX, setScrollX] = useState(0); // For detecting start scroll postion
  const [scrollEnd, setScrollEnd] = useState(false); // For detecting end of scrolling
  const ref = useRef<HTMLUListElement>(null);

  const handleClick = (scrollOffset: number) => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollLeft += scrollOffset;
    setScrollX(scrollX + scrollOffset);
  };

  const handleScroll = () => {
    if (!ref.current) {
      return;
    }
    setScrollX(ref.current.scrollLeft);
    if (
      Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
      ref.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollTo(position - 40, 0);
  }, [position]);

  return (
    <>
      {scrollX !== 0 ? (
        <button
          className="hidden absolute left-0 top-1/2 -translate-y-1/2 w-7 h-[90%] m-auto items-center justify-center z-10 bg-main-light cursor-pointer sm:flex"
          onClick={() => handleClick(-200)}
        >
          <ChevronLeftIcon
            className="w-6 h-6"
            aria-label="scroller vers la gauche dans les journées"
          />
        </button>
      ) : null}
      <ul
        ref={ref}
        id="tabs"
        className="tabs__scrollbar--hide relative w-full h-full px-6 flex items-center gap-10 overflow-x-scroll scroll-smooth sm:px-10"
        onScroll={handleScroll}
      >
        {children}
      </ul>
      {!scrollEnd ? (
        <button className="hidden absolute right-0 top-1/2 -translate-y-1/2 w-7 h-[90%] m-auto items-center justify-center z-50 bg-main-light cursor-pointer sm:flex">
          <ChevronRightIcon
            className="w-6 h-6"
            aria-label="scroller vers la droite dans les journées"
            onClick={() => handleClick(200)}
          />
        </button>
      ) : null}
    </>
  );
};

export default Tabs;
