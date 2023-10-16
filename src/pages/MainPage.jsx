import React, { useRef, useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';
import Bag from '../img/ico/ShoppingBag.svg';

import icoFire from '../img/ico/Fire.svg';
import icoPizza from '../img/ico/Pizza.svg';
import icoSushi from '../img/ico/Sushi.svg';
import icoDrink from '../img/ico/Drink.svg';
import icoSnacks from '../img/ico/Snacks.svg';
import icoCombo from '../img/ico/Combo.svg';
import icoDessert from '../img/ico/Dessert.svg';
import icoSauce from '../img/ico/Sauce.svg';


import promotionImg1 from '../img/promotion1.jpg';
import promotionImg2 from '../img/promotion2.jpg';

import s from '../styles/index.module.css';

import Food from '../components/ContainerFood';
import { useSelector, useDispatch } from 'react-redux'
import { toggleElement, showMessage, hideMessage } from '../store/AppSlice';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Scrollbar, Autoplay, Parallax } from 'swiper/modules';
import 'swiper/css/scrollbar';
import 'swiper/css/parallax';
import 'swiper/css';

export default function Main() {
	const dispatch = useDispatch();
	let messageIndicator = useSelector((state) => state.app.shoppingMessage);
	const listShopping = useSelector((state) => state.app.listShopping);
	let foodList = useSelector((state) => state.app.responseFood);
	if (messageIndicator) {
		dispatch(showMessage())
		setTimeout(() => {
			dispatch(hideMessage())
		}, 2000);
	}
	let [bottomText, setBottomText] = useState(false);

	return (
		<>
			<main className={s.main}>
				<nav id='Акции'>
					<ul className={s.list__nav}>
						<li className={s.list__nav_item}>
							<a className={s.list__link} href='#Акции'>
								<img src={icoFire} className={s.list__img} />
								<span className={s.list__text_red}>
									Акции
								</span>
							</a>
						</li>
						<li className={s.list__nav_item}>
							<a className={s.list__link} href='#Пицца'>
								<img src={icoPizza} className={s.list__img} />
								<span className={s.list__text}>
									Пицца
								</span>
							</a>
						</li>
						<li className={s.list__nav_item} >
							<a className={s.list__link} href='#Суши'>
								<img src={icoSushi} className={s.list__img} />
								<span className={s.list__text}>
									Суши
								</span>
							</a>
						</li>
						<li className={s.list__nav_item}>
							<a className={s.list__link} href='#Напитки'>
								<img src={icoDrink} className={s.list__img} />
								<span className={s.list__text}>
									Напитки
								</span>
							</a>
						</li>
						<li className={s.list__nav_item}>
							<a className={s.list__link} href='#Закуски'>
								<img src={icoSnacks} className={s.list__img} />
								<span className={s.list__text}>
									Закуски
								</span>
							</a>
						</li>
						<li className={s.list__nav_item}>
							<a className={s.list__link} href='#Комбо'>
								<img src={icoCombo} className={s.list__img} />
								<span className={s.list__text}>
									Комбо
								</span>
							</a>
						</li>
						<li className={s.list__nav_item}>
							<a className={s.list__link} href='#Десерты'>
								<img src={icoDessert} className={s.list__img} />
								<span className={s.list__text}>
									Десерты
								</span>
							</a>
						</li>
						<li className={s.list__nav_item}>
							<a className={s.list__link} href='#Соусы'>
								<img src={icoSauce} className={s.list__img} />
								<span className={s.list__text}>
									Соусы
								</span>
							</a>
						</li>
					</ul>
				</nav>
				<div className={s.promotion}>
					<Swiper
						modules={[Scrollbar, Parallax, Autoplay]}
						slidesPerView={'auto'}
						spaceBetween={20}
						rewind={true}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						mousewheel={{
							invert: true,
						}}
						scrollbar={{
							draggable: true,
							color: 'fff'
						}}
						className="swiper-wrapper"
					>
						<SwiperSlide className='promotion-swiper-slide' >
							<img src={promotionImg1} className={s.promotion__img} />

							<div className={s.promotion__text}>
								3 средние пиццы
								<p>от 999 рублей</p>
							</div>
						</SwiperSlide>
						<SwiperSlide className='promotion-swiper-slide' >
							<img src={promotionImg2} className={s.promotion__img} />

							<div className={s.promotion__text}>
								Кэшбек 10% на
								<p>самовывоз (доставка)</p>
							</div>
						</SwiperSlide>
						<SwiperSlide className='promotion-swiper-slide' >
							<img src={promotionImg1} className={s.promotion__img} />

							<div className={s.promotion__text}>
								3 средние пиццы
								<p>от 999 рублей</p>
							</div>
						</SwiperSlide>
						<SwiperSlide className='promotion-swiper-slide' >
							<img src={promotionImg2} className={s.promotion__img} />

							<div className={s.promotion__text}>
								Кэшбек 10% на
								<p>самовывоз (доставка)</p>
							</div>
						</SwiperSlide>
						<SwiperSlide className='promotion-swiper-slide' >
							<img src={promotionImg1} className={s.promotion__img} />

							<div className={s.promotion__text}>
								3 средние пиццы
								<p>от 999 рублей</p>
							</div>
						</SwiperSlide>
						<SwiperSlide className='promotion-swiper-slide' >
							<img src={promotionImg2} className={s.promotion__img} />

							<div className={s.promotion__text}>
								Кэшбек 10% на
								<p>самовывоз (доставка)</p>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
				{foodList &&
					<article>
						<section className={s.section__main_page} id='Пицца'>
							<Food food={foodList[0]} name='Пицца'></Food>
						</section>
						<section className={s.section__main_page} id='Суши'>
							<Food food={foodList[1]} name='Суши'></Food>
						</section>
						<section className={s.section__main_page} id='Напитки'>
							<Food food={foodList[3]} name='Напитки'></Food>
						</section>
						<section className={s.section__main_page} id='Закуски'>
							<Food food={foodList[2]} name='Закуски'></Food>
						</section>
						<section className={s.section__main_page} id='Комбо'>
							<Food food={foodList[4]} name='Комбо'></Food>
						</section>
						<section className={s.section__main_page} id='Десерты'>
							<Food food={foodList[5]} name='Десерты'></Food>
						</section>
						<section className={s.section__main_page} id='Соусы'>
							<Food food={foodList[6]} name='Соусы'></Food>
						</section>
					</article>
				}
				<div className={s.bottom__text}>

					<div className={bottomText ? s.bottom__gradient_hide : s.bottom__gradient_block}></div>
					<h2 className={s.bottom__text_title}>
						Доставка пиццы
					</h2>
					<div className={bottomText ? s.bottom__txt_full : s.bottom__txt}>
						<p>Захотелось чего-то вкусного и сытного? Желание простое и понятное,
							только в холодильнике все не то, и до магазина идти лень.
							Все пропало? Нет. Недорого заказать пиццу в Москве очень просто!
							Вам на помощь спешит супергерой – Domino’s Pizza! Как у всякого
							супергероя, у Domino’s Pizza есть свои суперсилы: восхитительный
							вкус продукции из отборных ингредиентов; широкий ассортимент,
							включающий легендарные, фирменные и классические виды, для
							вегетарианцев и любителей экспериментировать; быстрая и
							бесплатная доставка пиццы в течение 30 минут, чтобы вкусное
							и ароматное блюдо не успевало остыть.</p>
						<h3 className={s.bottom__txt_title}>
							Как сделать заказ
						</h3>

						<p>Доставка пиццы от Domino’s – это когда
							Вам не нужно никуда ехать или звонить,
							ведь есть Интернет. Никогда еще заказ пиццы на дом в Москве
							не был таким простым! Чтобы заказать пиццу онлайн,
							Вам необходимо: выбрать понравившийся вариант и количество
							порций; положить желаемое в «Корзину»; не уходить далеко,
							так как вкусная пицца на заказ с доставкой уже мчится к
							Вам из ближайшей пиццерии Domino’s. И не забудьте оплатить
							заказ курьеру!</p>
					</div>
					<button onClick={() => setBottomText(!bottomText)} className={s.bottom__btn}>
						{bottomText ? <>Скрыть</> : <>Показать полностью</>}
					</button>
				</div>
				{listShopping.length != 0 &&
					<button onClick={() => dispatch(toggleElement('handlePopapMobileShopping'))} className={s.mobile__shopping_bag}>
						<img src={Bag} alt="Bag" />
						<div className={s.mobile__shopping_counter}>
							{listShopping.length}
						</div>
					</button>
				}
			</main>
		</>
	);
}







