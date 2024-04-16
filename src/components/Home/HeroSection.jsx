import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import SingleSlide from './SingleSlide';
import images from '../../assets/assets';

export default function HeroSection() {
    return (
        <>
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                effect={'slide'}
                speed={500}
                className="mySwiper"
            >
                <SwiperSlide>
                    <SingleSlide
                        subTitle="Elevate your style"
                        mainTitle="Exquisite sneakers for the modern gentleman"
                        modelImage={images.bannerThird}
                        btnFirst="Shop Now"
                        btnSecond="View Collection" />
                </SwiperSlide>
                <SwiperSlide>
                    <SingleSlide
                        subTitle="Amazing Online Store"
                        mainTitle="Keep Calm And Surround With Fashion"
                        modelImage={images.bannerFirst}
                        btnFirst="Shop Now"
                        btnSecond="View Collection" />
                </SwiperSlide>
                <SwiperSlide>
                    <SingleSlide
                        subTitle="Fashion for Female"
                        mainTitle="Be Attractive & Elegant with Our Dress"
                        modelImage={images.bannerSecond}
                        btnFirst="Shop Now"
                        btnSecond="View Collection" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
