import React, { useRef, useState, useEffect } from 'react';
import { Link, Outlet} from 'react-router-dom';
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
import icoPhone from '../img/ico/Telephone.svg';
import icoLocation from '../img/ico/Location.svg';
import icoFacebook from '../img/ico/Facebook.svg';
import icoInstagram from '../img/ico/Instagram.svg';


import s from '../styles/index.module.css';



import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux'
import 
{ 
toggleElement,
showMessage,
hideMessage,
setResponseFood,
setFinalPrice,
setRouteState
} from '../store/AppSlice';

import PopapEditFood from '../components/EditFood';
import PopapMobileEditFood from '../components/Mobile_EditPizza';
import PopapShopping from '../components/ShoppingPopap';
import PopapFilter from '../components/FilterPopap';
import PopapMobileFilter from '../components/Mobile_FiltersPopap';
import PopapMobileShopping from '../components/Mobile_Shopping';

import 'swiper/css/scrollbar';
import 'swiper/css/parallax';
import 'swiper/css';

import ArrowLeftOrange from '../img/ico/ArrowLeftOrange.svg';

export default function Page() {
	const dispatch = useDispatch();
	const wrapper = useRef(null);
	const header = useRef(null);
	const popapPizza = useSelector((state) => state.app.handlePopapPizza);
	const listShopping = useSelector((state) => state.app.listShopping);

	const popapShopping = useSelector((state) => state.app.handlePopapShopping);
	const popapMobileShopping = useSelector((state) => state.app.handlePopapMobileShopping);
	const popapFilter = useSelector((state) => state.app.handlePopapFilter);
	const popapMobileFilter = useSelector((state) => state.app.handlePopapMobileFilter);
	const popapPizzaMobile = useSelector((state) => state.app.handlePopapMobileEditPizza);
	const messageIndicator = useSelector((state) => state.app.shoppingMessage);
	const finalPrice = useSelector((state) => state.app.finalPrice);
	const routeState = useSelector((state) => state.app.routeState);


	if (messageIndicator) {
		dispatch(showMessage())
		setTimeout(() => {
			dispatch(hideMessage())
		}, 2000);
	}
	let navigation = useRef();

	const handleScroll = () => {
		const scrollPositionWindow = window.pageYOffset;
		if(navigation.current){
			if (scrollPositionWindow > 500) {
				navigation.current.style.marginTop = '0px';
			} else {
				navigation.current.style.marginTop = '-110px';
			}
		}
	}
	console.log(routeState)

	

	useEffect(() => {
		fetch('https://64d2e00967b2662bf3db7cc3.mockapi.io/items')
			.then((res) => res.json())
			.then((res) => {
				dispatch(setResponseFood(res));
			});
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		}
	}, []);
	useEffect(() => {
		const windowWidth = window.innerWidth;
		if (windowWidth > 768) {
			if (popapPizza || popapFilter || popapShopping) {
				document.body.style.overflowY = 'hidden';
				wrapper.current.style.margin = '0 10px 0 0';
				header.current.style.right = '5px';
			}
			else {
				document.body.style.overflowY = 'scroll';
				wrapper.current.style.margin = '0 0px 0 0';
				header.current.style.right = '0px';
			}
		} else {
			if (popapMobileFilter || popapPizzaMobile || popapMobileShopping) {
				document.body.style.overflowY = 'hidden';
				wrapper.current.style.margin = '0 0px 0 0';
				header.current.style.right = '0px';
			} else {
				document.body.style.overflowY = 'scroll';
				wrapper.current.style.margin = '0 0px 0 0';
				header.current.style.right = '0px';
			}
		}

		console.log(header);
	}, [popapPizza, popapShopping,
		popapFilter, popapMobileFilter,
		popapPizzaMobile, popapMobileShopping])
	

	let localFinalPrice = 0;

	for (let i = 0; i < listShopping.length; i++) {
		if(listShopping[i].quantity == 1){
			localFinalPrice = localFinalPrice + listShopping[i].price; 
		}else{
			let n = listShopping[i].quantity;
			while(n){
				localFinalPrice = localFinalPrice + listShopping[i].price; 
				n--
			}	
		}	
	}
	dispatch(setFinalPrice(localFinalPrice))
	const shopMessage = useRef();

	const popapPizzaRef = useRef(null);
	const popapPizzaMobileRef = useRef(null);
	const popapShopRef = useRef(null);
	const popapFilterRef = useRef(null);
	const popapMobileFilterRef = useRef(null);
	const popapMobileShoppingRef = useRef(null);

	return (
		<div ref={wrapper} className={s.wrapper}>
			<header ref={header} className={s.header}>
				<div className={s.container__header}>
					<div className={s.logo}>
						{routeState != 'main' &&
							<Link to={'/main'} 
							onClick={
								()=>{
									dispatch(setRouteState('main'));
									window.scrollTo(0 , 0)
								}
							}>
								<img src={ArrowLeftOrange}/>
							</Link>
						}
						<img className={s.logo__img} src={Logo} alt="LOGO" />
						<span className={routeState == 'main' ? s.logo__text : s.logo__text_confirm}>Pizza</span>
					</div>
					{routeState == 'main' &&
						<>
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
						</>
						}
					<button onClick={() => dispatch(toggleElement('handlePopapShopping'))} className={s.shop__top} >
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
				<Outlet />
			</div>
			<footer className={s.footer}>
				<div className={s.container__footer}>
					<div className={s.footer__column}>
						<div className={s.footer__logo}>
							<img src={Logo} />
							<span>Pizza</span>
						</div>
						<div className={s.footer__copyright}>
							© Copyright 2021 — Pizza
						</div>
					</div>
					<div className={s.footer__column}>
						<h3 className={s.footer__title}>Pizza</h3>
						<ul className={s.footer__list}>
							<li className={s.footer__link}>
								<a href="#">О компании</a>
							</li>
							<li className={s.footer__link}>
								<a href="#">Пользовательское соглашение</a>
							</li>
							<li className={s.footer__link}>
								<a href="#">Условия гарантии</a>
							</li>
						</ul>
					</div>
					<div className={s.footer__column}>
						<h3 className={s.footer__title}>Помощь</h3>
						<ul className={s.footer__list}>
							<li className={s.footer__link}>
								<a href="#">Ресторан</a>
							</li>
							<li className={s.footer__link}>
								<a href="#">Контакты</a>
							</li>
							<li className={s.footer__link}>
								<a href="#">Поддержка</a>
							</li>
							<li className={s.footer__link}>
								<a href="#">Отследить заказ</a>
							</li>
						</ul>
					</div>
					<div className={s.footer__column}>
						<h3 className={s.footer__title}>Контакты</h3>
						<ul className={s.footer__list}>
							<li className={s.footer__contacts}>
								<img src={icoPhone} className={s.footer__contacts_img} />
								<span className={s.footer__contacts_text}>+7 (926) 223-10-11</span>
							</li>
							<li className={s.footer__contacts}>
								<img src={icoLocation} className={s.footer__contacts_img} />
								<span className={s.footer__contacts_text}>Москва, ул. Юных Ленинцев, д.99</span>
							</li>
							<li className={s.footer__contacts_socnetworks}>
								<div className={s.footer__contacts} >
									<img src={icoFacebook} className={s.footer__contacts_img} />
									<a href='' className={s.footer__contacts_text}>Facebook</a>
								</div>
								<div className={s.footer__contacts} >
									<img src={icoInstagram} className={s.footer__contacts_img} />
									<a href='' className={s.footer__contacts_text}>Instagram</a>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</footer>
			<div>
				<CSSTransition
					in={popapPizza}
					nodeRef={popapPizzaRef}
					timeout={60}
					classNames='edit'
					unmountOnExit
				>
					<PopapEditFood popapPizzaRef={popapPizzaRef} />
				</CSSTransition>

				<CSSTransition
					in={popapPizzaMobile}
					nodeRef={popapPizzaMobileRef}
					timeout={200}
					classNames='edit-mobile'
					unmountOnExit
				>
					<PopapMobileEditFood popapPizzaMobileRef={popapPizzaMobileRef} />
				</CSSTransition>

				<CSSTransition
					in={popapShopping}
					nodeRef={popapShopRef}
					timeout={200}
					classNames='shop'
					unmountOnExit
				>
					<PopapShopping popapShopRef={popapShopRef} />
				</CSSTransition>

				<CSSTransition
					in={popapMobileShopping}
					nodeRef={popapMobileShoppingRef}
					timeout={200}
					classNames='shop_mobile'
					unmountOnExit
				>
					<PopapMobileShopping popapMobileShopRef={popapMobileShoppingRef} />
				</CSSTransition>

				<CSSTransition
					in={popapFilter}
					nodeRef={popapFilterRef}
					timeout={200}
					classNames='filter'
					unmountOnExit
				>
					<PopapFilter popapFilterRef={popapFilterRef} />
				</CSSTransition>

				<CSSTransition
					in={popapMobileFilter}
					nodeRef={popapMobileFilterRef}
					timeout={200}
					classNames='mobile_filter'
					unmountOnExit
				>
					<PopapMobileFilter popapMobileFilterRef={popapMobileFilterRef} />
				</CSSTransition>
			</div>
		</div>
	);
}