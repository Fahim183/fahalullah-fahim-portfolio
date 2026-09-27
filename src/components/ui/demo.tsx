"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import profileCoverImg from "../../assets/images/fahim_profile_cover_1790450289856.jpg";

// Image component compatible with React / Vite (Next.js Image drop-in compatibility)
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number | string;
  height?: number | string;
}

const Image = ({ src, alt, className, draggable, width, height, ...props }: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt || "Image"}
      className={className}
      draggable={draggable}
      width={width}
      height={height}
      loading="eager"
      {...props}
    />
  );
};

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="mb-4">
            <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
              Developer Profile
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Fahalullah Fahim <br />
              <span className="text-4xl sm:text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 mt-2 block leading-none">
                Full-Stack & Motion Specialist
              </span>
            </h2>
          </div>
        }
      >
        <div className="w-full h-full relative overflow-hidden rounded-2xl bg-slate-950">
          <Image
            src={profileCoverImg}
            alt="Fahalullah Fahim - Full-Stack Developer Profile"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full w-full object-[center_20%] shadow-2xl"
            draggable={false}
          />
        </div>
      </ContainerScroll>
    </div>
  );
}

export default HeroScrollDemo;
