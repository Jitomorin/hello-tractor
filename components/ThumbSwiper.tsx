import React, { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SwiperClass from "swiper/types/swiper-class";
import { FreeMode, Navigation, Thumbs, Controller } from "swiper/modules";

export default function ThumbSwiper({ images }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [firstSwiper, setFirstSwiper] = useState<any>();
  const [secondSwiper, setSecondSwiper] = useState<any>();
  const swiper1Ref = useRef<any>(null);
  const swiper2Ref = useRef();

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  return (
    <div className="h-[550px] hidden md:block mb-[10rem] xl:mb-[30rem] ">
      <Swiper
        onSwiper={(swiper) => {
          if (swiper1Ref.current !== null) {
            swiper1Ref.current = swiper;
          }
        }}
        style={
          {
            // "--swiper": "z-index: 0",
          }
        }
        preloadImages={false}
        controller={{ control: secondSwiper }}
        spaceBetween={10}
        slidesPerView={1}
        grabCursor={true}
        navigation={false}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs, Controller]}
        className="w-full max-w-full h-[550px]"
      >
        {images.map((image: any, index: number) => (
          <SwiperSlide
            className="flex justify-center items-center "
            key={index}
          >
            <div className="flex justify-center items-center w-full h-full">
              <img
                className="w-full max-h-full object-fill"
                key={index}
                src={image}
                alt="Rental Image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        style={{}}
        controller={{ control: firstSwiper }}
        loop={false}
        spaceBetween={10}
        slidesPerView={8}
        watchSlidesProgress
        touchRatio={0.2}
        preloadImages={false}
        lazy
        slideToClickedSlide={true}
        onSwiper={setThumbsSwiper}
        modules={[Thumbs, Controller]}
        className="h-[100.4px] w-full  mt-[20px]"
      >
        {images.map((image: any, index: number) => (
          <SwiperSlide key={index}>
            <img
              key={index}
              src={image}
              alt="Rental Image"
              className=" h-[100px] w-full cursor-pointer"
            />
            <div className="absolute inset-0 h-[100px] rounded-md cursor-pointer bg-black opacity-0 hover:opacity-50 transition-opacity duration-400 ease-in-out"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
