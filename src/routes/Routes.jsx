
import React, {useRef, useState, useEffect} from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';
import Main from '../components/MainPage'
import Menu from '../components/MenuPage'

export default function Navigation() {
	
	return (
		<Routes>
 			<Route to='/' element={<Main/>}>
				<Route to='/menu' element={<Menu/>}/>
			</Route>	
			
		</Routes>
  	);
}