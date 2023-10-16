import React, { useRef, useState, useEffect, useCallback } from 'react';

import s from '../../styles/confirm.module.css';
import { useDispatch } from 'react-redux'

import {pushListShopping} from '../../store/AppSlice';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


import { Navigation} from 'swiper/modules';


import icoArrowLeft from '../../img/ico/ArrowLeft.svg';
import icoArrowRight from '../../img/ico/ArrowRight.svg';
export default function ExtraFood({food, name}) {
	const dispatch = useDispatch();
	const pushShopList = (id)=>{
		const item = food[id];
		dispatch(pushListShopping({
			urlImg:item.imgUrl,
			key:item.key,
			name:item.title,
			size:null,
			weidth:null,
			price:item.price,
			type:null}))
	}

	const sliderRef = useRef(null);

	const handlePrev = useCallback(() => {
	  if (!sliderRef.current) return;
	  sliderRef.current.swiper.slidePrev();
	}, []);
  
	const handleNext = useCallback(() => {
	  if (!sliderRef.current) return;
	  sliderRef.current.swiper.slideNext();
	}, []);


	return (
		<>
			<h2 className={s.confirm__extra_block}>{name}</h2>
			<div className={s.confirm__extra_product}>
				{food.length > 4 && 
					<button onClick={handlePrev} className={s.extra__product_arrow_prew}>
						<img src={icoArrowLeft}/>
					</button>
				}
				<div className={s.extra__product_window}>
					<Swiper 
					modules={[Navigation]}
					slidesPerView={'auto'}
					className={s.extra__product_list}
					ref={sliderRef}>
						{food.map((value) => (
							<SwiperSlide key={value.key} className={s.extra_product}>
								<div className={s.extra_product_img}>
									<img src={value.imgUrl} />
								</div>
								<div className={s.extra_product_title_price} >
									<h3 className={s.extra_product_title}>{value.title}</h3>
									<button onClick={() => pushShopList(value.id - 1)} className={s.extra_product_price}>{value.price} ₽</button>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				{food.length > 4 && 
					<button onClick={handleNext} className={s.extra__product_arrow_next}>
						<img src={icoArrowRight} />
					</button>
				}
			</div>
		</>
	);
}
	
	
	
	