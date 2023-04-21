import classNames from "classnames";
import "./index.css";
import { useEffect, useRef, useState } from "react";

const persons = [
  {
    img: "https://unsplash.com/photos/mzN7eMmv9IM/download?force=true&w=590&h=640",
    title:
      "chief financial officer and executive vice president for global finance, aon plc",
    name: "Christa Davies",
  },
  {
    img: "https://unsplash.com/photos/oifclaPX5oM/download?force=true&w=590&h=640",
    title: "revenue and financial management, stripe",
    name: "Vivek Sharma",
  },
  {
    img: "https://unsplash.com/photos/fghYlu1ec2U/download?force=true&w=590&h=640",
    title: "head of product marketing, stripe",
    name: "Tanya Khakbaz",
  },
  {
    img: "https://unsplash.com/photos/a5XdeIb9Zso/download?force=true&w=590&h=640",
    title: "head of global sales, stripe",
    name: "Eileen O'Mara",
  },
  {
    img: "https://unsplash.com/photos/RDUyi9YXPxk/download?force=true&w=590&h=640",
    title: "founder, pulley",
    name: "Yin Wu",
  },
  {
    img: "https://unsplash.com/photos/TMZuhaL2kHo/download?force=true&w=590&h=640",
    title: "ceo and cofounder, crowdai",
    name: "Devaki Raj",
  },
  {
    img: "https://unsplash.com/photos/XO25cX2_0iE/download?force=true&w=590&h=640",
    title: "co-head of payments, wix",
    name: "Amit Sagiv",
  },
  {
    img: "https://unsplash.com/photos/DLKR_x3T_7s/download?force=true&w=590&h=640",
    title: "general partner, andreessen horowitz",
    name: "Angela Strange",
  },
];

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
        <ul ref={wrapperRef} className="group flex h-[640px] gap-[1.5%]">
          {persons.map((person, index) => (
            <li
              onClick={() => setActiveIndex(index)}
              aria-current={activeIndex === index}
              key={person.name}
              className={classNames(
                "relative cursor-pointer [transition:width_var(--transition,200ms_ease-in)] before:absolute before:bottom-0 before:left-[-10px] before:right-[-10px] before:top-0 before:bg-white first:w-[1%] last:w-[1%] [&:first-child_img]:opacity-0 [&:last-child_img]:opacity-0",
                activeIndex === index
                  ? "group-hover:not(:hover):w-[43%] w-[48%]"
                  : "w-[8%] group-hover:hover:[&:not(:first-child,:last-child)]:w-[12%] group-hover:[&:not(:first-child,:last-child,>[aria-current='true'],:has(>[aria-current='true']))]:w-[7%]"
              )}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#c9c6c7]">
                <img
                  className="absolute left-1/2 h-[640px] w-[590px] max-w-none -translate-x-1/2 object-cover object-center opacity-80 grayscale transition-opacity"
                  width="590px"
                  height="640px"
                  src={person.img}
                />
                <div
                  className={classNames(
                    "absolute inset-0 transition-opacity duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px]  before:z-10 before:bg-texture after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 after:bg-texture",
                    activeIndex === index ? "opacity-25" : "opacity-0"
                  )}
                />
                <div
                  className={classNames(
                    "absolute left-8 top-8 w-[590px] [transition-property:transform,opacity] [transition:var(--transition,300ms_ease-in-out)]",
                    activeIndex === index
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  )}
                >
                  <p className="text-lg uppercase text-primary">
                    {person.title}
                  </p>
                  <p className="text-4xl font-bold">{person.name}</p>
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
