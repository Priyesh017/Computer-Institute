"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  imgSrc: string;
};

const testimonials = [
  {
    name: "Rose Roberson",
    imgSrc: "/project.png",
  },
  {
    name: "Chace Rodgers",
    imgSrc: "/project.png",
  },
  {
    name: "Cornelius Sheppard",
    imgSrc: "/project.png",
  },
  {
    name: "Chace Rodgers",
    imgSrc: "/project.png",
  },
  {
    name: "Cornelius Sheppard",
    imgSrc: "/project.png",
  },
  {
    name: "Chace Rodgers",
    imgSrc: "/project.png",
  },
  {
    name: "Cornelius Sheppard",
    imgSrc: "/project.png",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full min-h-screen py-4 flex items-center">
      <div className="flex flex-col justify-center items-center mx-auto lg:max-w-6xl px-3">
        <span className="text-5xl font-bold">Testimonials</span>
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col px-4 py-5 sm:p-6">
                  <div className="flex flex-col justify-center items-center mt-6 rounded-lg shadow-[8px_8px_16px_#b8b9be,-8px_-8px_16px_#ffffff]">
                    <Image
                      src={testimonial.imgSrc}
                      alt="Image"
                      className="h-full w-full object-cover rounded-t-lg"
                      height={540}
                      width={540}
                      loading="lazy"
                    />
                    <div>
                      <p className="text-md font-semibold text-gray-900 p-3">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
        </Carousel>
      </div>
    </section>
  );
}
