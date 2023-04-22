import classNames from "classnames";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import { persons } from "./persons";

function App() {
  const [activeIndex, setActiveIndex] = useState(3);
  const transitionTimeoutRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (transitionTimeoutRef.current)
      clearTimeout(transitionTimeoutRef.current);

    wrapperRef.current.style.setProperty(
      "--transition",
      "600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
    );

    transitionTimeoutRef.current = setTimeout(() => {
      if (!wrapperRef.current) return;
      wrapperRef.current.style.removeProperty("--transition");
    }, 900);

    return () => {
      if (transitionTimeoutRef.current)
        clearTimeout(transitionTimeoutRef.current);
    };
  }, [activeIndex]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[1200px] max-w-full">
        <ul
          ref={wrapperRef}
          className="group flex flex-col gap-3 md:h-[640px] md:flex-row md:gap-[1.5%]"
        >
          {persons.map((person, index) => (
            <li
              onClick={() => setActiveIndex(index)}
              aria-current={activeIndex === index}
              key={person.name}
              className={classNames(
                "md:before-block relative w-full cursor-pointer before:absolute before:bottom-0 before:left-[-10px] before:right-[-10px] before:top-0 before:hidden before:bg-white md:h-auto md:[transition:width_var(--transition,200ms_ease-in)] md:first:w-[1%] md:last:w-[1%] md:[&:first-child_img]:opacity-0 md:[&:last-child_img]:opacity-0",
                activeIndex === index
                  ? "md:group-hover:not(:hover):w-[43%] md:w-[48%]"
                  : "md:w-[8%] md:group-hover:hover:[&:not(:first-child,:last-child)]:w-[12%] md:group-hover:[&:not(:first-child,:last-child,>[aria-current='true'],:has(>[aria-current='true']))]:w-[7%]"
              )}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#c9c6c7]">
                <img
                  className="absolute right-0 h-full w-24 object-cover object-center opacity-80 grayscale md:left-1/2 md:h-[640px] md:w-[590px] md:max-w-none md:-translate-x-1/2 md:transition-opacity"
                  width="590px"
                  height="640px"
                  src={person.img}
                />
                <div
                  className={classNames(
                    "inset-0 opacity-25 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px] before:z-10 before:bg-texture  after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 after:bg-texture md:absolute md:transition-opacity",
                    activeIndex === index ? "md:opacity-25" : "md:opacity-0"
                  )}
                />
                <div
                  className={classNames(
                    "w-[60%] p-4 [transition-property:transform,opacity] md:absolute md:left-8 md:top-8 md:w-[590px] md:p-0 md:[transition:var(--transition,300ms_ease-in-out)]",
                    activeIndex === index
                      ? "md:translate-x-0 md:opacity-100"
                      : "md:translate-x-4 md:opacity-0"
                  )}
                >
                  <p className="text-sm uppercase text-primary md:text-lg">
                    {person.title}
                  </p>
                  <p className="text-lg font-bold md:text-4xl">{person.name}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
