/* eslint-disable jsx-a11y/alt-text */
import Layout from "@components/layout";
import { cls, importAll } from "@libs/client/utils";
import type { NextPage } from "next";
import Image from "next/image";
import { useRef, useState } from "react";

import bgImg from "../public/bgImg.jpeg";
import { useEffect } from "react";

const Home: NextPage = () => {
  const contentRef = useRef<null | HTMLDivElement[]>([]);

  const [hoverContent, setHoverContent] = useState(null);
  const [imgBlur, setImgBlur] = useState(false);

  const images = importAll(
    require.context("../public/trainers", false, /\.(png|jpeg|svg)$/)
  );

  useEffect(() => {
    const heightDetect = () => {
      if (window.scrollY > window.innerHeight / 3) {
        setImgBlur(true);
      } else {
        setImgBlur(false);
      }
    };
    window.addEventListener("wheel", heightDetect);
  });

  function intersectionCallback(entries: any[], observer: any) {
    entries.forEach(entry => {
      entry.target.classList.toggle("bg-red-500", entry.isIntersecting);
      entry.target.children[0].classList.toggle("border", entry.isIntersecting);
    });
  }

  useEffect(() => {
    var intersectionOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };
    var io = new IntersectionObserver(
      intersectionCallback,
      intersectionOptions
    );
    contentRef.current.forEach(el => {
      io.observe(el);
    });
  }, []);

  return (
    <Layout seoTitle="Home">
      <div className="relative pb-[500px]">
        {/* <div
          className={cls(
            "fixed -z-50 aspect-square w-full transition-all duration-500",
            imgBlur ? "blur-sm brightness-[0.25] grayscale" : ""
          )}
        >
          <Image
            src={bgImg}
            layout="fill"
            className="object-cover object-bottom brightness-90 contrast-125"
          />
        </div> */}
        <div className="relative top-[500px] grid w-full grid-flow-row">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              className="opaciti-0 h-96 transition-all duration-500"
              ref={el => (contentRef.current[i] = el)}
            >
              <div className="transition-all duration-[5s]">abc</div>
            </div>
          ))}
        </div>
        <div className="relative top-[500px] overflow-hidden py-20">
          <div className="hover:pause grid w-[calc(250px*20)] animate-slider-img grid-flow-col scrollbar-hide">
            {images.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoverContent(index)}
                  onMouseLeave={() => setHoverContent(null)}
                  className={cls(
                    "relative h-96 w-[200px] cursor-pointer overflow-hidden rounded-md bg-neutral-800 shadow-lg shadow-black  transition-all duration-500 hover:scale-125",
                    hoverContent === index
                      ? "z-50 hover:brightness-100 hover:grayscale-0"
                      : "",
                    hoverContent
                      ? "brightness-[0.20] grayscale"
                      : "brightness-100"
                  )}
                >
                  <Image
                    src={item.default.src}
                    layout="fill"
                    className={cls("object-cover ")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
