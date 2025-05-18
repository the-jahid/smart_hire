"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";


export function HeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden relative rounded-lg">
        
               <div
        className={cn(
            "w-[90%]",
                    "h-[70%]",
                    "mx-auto",
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
              
     
      <ContainerScroll
        titleComponent={
          <div className="px-4 py-10 md:py-20">
          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
            {"Find your perfect university in minutes, not months"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
          >
            Discover university programs that match your interests and career goals. Let our AI guide you through the application process quickly and efficiently.
          </motion.p>
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button className="w-60 transform rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-blue-400 dark:text-black dark:hover:bg-blue-300">
              Search Universities
            </button>
            <button className="w-60 transform rounded-lg border border-blue-300 bg-white px-6 py-2 font-medium text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-100 dark:border-blue-700 dark:bg-black dark:text-blue-200 dark:hover:bg-blue-900">
              Get Application Help
            </button>
          </motion.div> */}
      </div>
        }
      >
        {/* <img
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        /> */}

        <Image src={'/85z_2201_w009_n001_95c_p6_95.jpg'} height={720} width={1400} className="mx-auto rounded-2xl object-cover h-full object-left-top" alt="Hero Image" />
      </ContainerScroll>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
    </div>
  );
}
