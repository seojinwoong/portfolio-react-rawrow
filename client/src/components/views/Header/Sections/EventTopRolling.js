import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper.scss";
import { Link } from 'react-router-dom';

SwiperCore.use([Autoplay]);

const EventTopRolling = memo(() => {
  return (
    <div className="event-top-rolling"> 
      <Swiper autoplay={{ delay: 2500, disableOnInteraction: false }} loop={true} speed={600}>
        <SwiperSlide>
          <Link to="/">가입하면 바로 쓸 수 있는 <em className="emphasis">5,000 마일리지</em></Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/">카카오 친구 추가하면 <em className="emphasis">5% 할인쿠폰</em> 바로지급</Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/">지금 <em className="emphasis">R EYE</em> 구매하면 <em className="emphasis">가방</em>을 선물해드려요</Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
});

export default EventTopRolling;
