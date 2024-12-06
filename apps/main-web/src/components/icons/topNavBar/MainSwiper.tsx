'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

const pets = [
  {
    name: 'Maxi',
    type: 'Dog',
    breed: 'Border Collie',
    imageUrl: 'https://picsum.photos/200/150?random=3',
  },
  {
    name: 'Dalsuni',
    type: 'Dog',
    breed: 'Golden Retriever',
    imageUrl: 'https://picsum.photos/200/150?random=1',
  },
  {
    name: 'Miro',
    type: 'Cat',
    breed: 'Persian',
    imageUrl: 'https://picsum.photos/200/150?random=2',
  },
  {
    name: 'Igo',
    type: 'Lizard',
    breed: 'Iguana',
    imageUrl: 'https://picsum.photos/200/150?random=4',
  },
  {
    name: 'Mimi',
    type: 'Cat',
    breed: 'Siames',
    imageUrl: 'https://picsum.photos/200/150?random=5',
  },
];

export default function MainSwiper() {
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward'); // 슬라이드 방향 상태
  const [SlideIndex, setSlideIndex] = useState(0); // 현재 슬라이드 인덱스
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: any) => {
    setSlideIndex(swiper.activeIndex); // 현재 슬라이드 인덱스를 업데이트

    // 끝 또는 처음에 도달하면 방향 변경
    if (direction === 'forward' && swiper.activeIndex === pets.length - 1) {
      setDirection('backward');
      swiper.autoplay.stop();
      swiper.params.autoplay.reverseDirection = true; // 역방향으로 변경
      swiper.autoplay.start();
    } else if (direction === 'backward' && swiper.activeIndex === 0) {
      setDirection('forward');
      swiper.autoplay.stop();
      swiper.params.autoplay.reverseDirection = false; // 정방향으로 변경
      swiper.autoplay.start();
    }
  };

  return (
    <section className="relative h-[280px] overflow-hidden">
      <Swiper
        direction="vertical"
        slidesPerView={3}
        centeredSlides
        spaceBetween={-50}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 25,
          depth: 250,
          modifier: 2.5,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="h-full"
        onSlideChange={handleSlideChange} // 슬라이드 변경 이벤트
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Swiper 인스턴스를 저장
      >
        {pets.map((pet, index) => (
          <SwiperSlide key={index} className="swiper-slide-custom">
            <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg relative flex items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{pet.name}</h2>
                <p className="text-gray-300">
                  {pet.type} | {pet.breed}
                </p>
              </div>
              <Image
                src={pet.imageUrl}
                alt={`${pet.name} image`}
                width={200}
                height={250}
                priority
                className="w-[8.5rem] h-[8.5rem] rounded-full object-cover border-4 border-white absolute right-5"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center items-center mt-4 space-x-1 absolute bottom-5 w-full">
        {pets.map((_, index) => (
          <div
            key={index}
            className={`h-[5px] rounded-full transition-all ${
              index === SlideIndex
                ? 'bg-orange-500 w-[18px]'
                : 'bg-gray-300 w-[5px]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
