import React, {useRef, useState, useEffect} from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';
import Logo from '../img/ico/LOGO.svg';
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

import Food from './ContainerFood';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux'
import { toggleElement, showMessage, hideMessage, togglePopapMobileShopping} from '../store/AppSlice';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination } from 'swiper/modules';

export default function Main({food, pizzes, sushi, snacks, drinks, combo, desserts, sauce, navigation, headerRef}) {
	const dispatch = useDispatch();
	let messageIndicator = useSelector((state) => state.app.shoppingMessage);
	const listShopping = useSelector((state) => state.app.listShopping);
	let finalPrice = useSelector((state) => state.app.finalPrice);
	if(messageIndicator){
		dispatch(showMessage())
		setTimeout(()=>{
			dispatch(hideMessage())
		}, 2000);
	}
	console.log(messageIndicator);
	const shopMessage = useRef();
	return (
		<div className={s.wrapper}>
			<header ref={headerRef}  className={s.header}> 
				<div  className={s.container__header}>
					<div className={s.logo}> 
						<img className={s.logo__img} src={Logo} alt="LOGO" />
						<span className={s.logo__text}>Pizza</span>
					</div>
					<nav ref={navigation} className={s.logo__navigation}>
						<a href='#Акции'>Акции</a>
						<a href='#Пицца'>Пицца</a>
						<a href='#Суши'>Суши</a>
						<a href='#Напитки'>Напитки</a>
						<a href='#Закуски'>Закуски</a>
						<a href='#Комбо'>Комбо</a>
						<a href='#Десерты'>Десерты</a>
						<a href='#Соусы'>Соусы</a>
					</nav>
					<nav className={s.logo__navigation_mobile}>
						<a href='#Акции' className={s.navigation_mobile_item}>
							<img src={icoFire} />
							<span>Акции</span>
						</a>
						<a href='#Пицца' className={s.navigation_mobile_item}>
							<img src={icoPizza} />
							<span>Пицца</span>
						</a>
						<a href='#Суши' className={s.navigation_mobile_item}>
							<img src={icoSushi} />
							<span>Суши</span>
						</a>
						<a href='#Напитки' className={s.navigation_mobile_item}>
							<img src={icoDrink} />
							<span>Напитки</span>
						</a>
						<a href='#Закуски' className={s.navigation_mobile_item}>
							<img src={icoSnacks} />
							<span>Закуски</span>
						</a>
						<a href='#Комбо' className={s.navigation_mobile_item}>
							<img src={icoCombo} />
							<span>Комбо</span>
						</a>
						<a href='#Десерты' className={s.navigation_mobile_item}>
							<img src={icoDessert} />
							<span>Десерты</span>
						</a>
						<a href='#Соусы' className={s.navigation_mobile_item}>
							<img src={icoSauce} />
							<span>Соусы</span>
						</a>
					</nav>
					<button onClick={()=>dispatch(toggleElement('handlePopapShopping'))} className={s.shop__top} > 
						<img className={s.shop__img} src={Bag} alt="bag" />
						<span className={s.shop__price}>{finalPrice} ₽</span>
					</button>
				</div>
			</header>
			<CSSTransition
				in={messageIndicator}
				nodeRef={shopMessage}
				timeout={2000}
				classNames='message_basket'
				unmountOnExit
			>
				<div className={s.shop__message_container}>
					<div ref={shopMessage} className={s.shop__message}>
						В корзине !
					</div>
				</div>
			</CSSTransition>
			<div className={s.container}>
				<main  className={s.main}>
					<nav id='Акции'>
						<ul className={s.list__nav}>
							<li className={s.list__nav_item}>
								<a className={s.list__link} href='#Акции'>
									<img src={icoFire} className={s.list__img}/>
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
								slidesPerView={'auto'}
								spaceBetween={20}
								parallax={true}
								pagination={{
								clickable: true,
								}}
								mousewheel = {{
									invert: true,
								}}
								modules={[Pagination]}
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
					
					<article>
						<section id='Пицца'>
							<Food food={pizzes} name='Пицца'></Food>
						</section>
						<section id='Суши'>
							<Food food={sushi} name='Суши'></Food>
						</section>
						<section id='Напитки'>
							<Food food={drinks} name='Напитки'></Food>
						</section>
						<section id='Закуски'>
							<Food food={snacks} name='Закуски'></Food>
						</section>
						<section id='Комбо'>
							<Food food={combo} name='Комбо'></Food>
						</section>
						<section id='Десерты'>
							<Food food={desserts} name='Десерты'></Food>
						</section>
						<section id='Соусы'>
							<Food food={sauce} name='Соусы'></Food>
						</section>
					</article>
					{listShopping.length &&
						<button onClick={()=>dispatch(toggleElement('handlePopapMobileShopping'))} className={s.mobile__shopping_bag}>
							<img src={Bag} alt="Bag" />
							<div className={s.mobile__shopping_counter}>
								{listShopping.length}
							</div>
						</button>
					}
				</main>
			</div>
		</div>
  	);
}