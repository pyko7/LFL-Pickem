import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useScrollX } from "@/src/hooks/useScrollX";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  position: number;
};

const Tabs = ({ children, position }: Props) => {
  const { scrollX, scrollEnd, ref, handleClick, handleScroll } =
    useScrollX(position);

  return (
    <>
      {scrollX !== 0 ? (
        <button
          name="naviguer vers la gauche dans les journées"
          aria-label="naviguer vers la gauche dans les journées"
          className="hidden absolute left-0 top-1/2 -translate-y-1/2 w-7 h-[90%] m-auto items-center justify-center z-10 bg-neutral-700 rounded-md cursor-pointer sm:flex"
          onClick={() => handleClick(-200)}
        >
          <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      ) : null}
      <ul
        role="tablist"
        ref={ref}
        className="tabs__scrollbar--hide relative w-full h-full px-6 flex items-center gap-10 overflow-x-scroll scroll-smooth sm:px-10"
        onScroll={handleScroll}
      >
        {children}
      </ul>
      {!scrollEnd ? (
        <button
          name="scroller vers la droite dans les journées"
          aria-label="scroller vers la droite dans les journées"
          className="hidden absolute right-0 top-1/2 -translate-y-1/2 w-7 h-[90%] m-auto items-center justify-center z-50 bg-neutral-700 rounded-md cursor-pointer sm:flex"
          onClick={() => handleClick(200)}
        >
          <ChevronRightIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      ) : null}
    </>
  );
};

export default Tabs;
