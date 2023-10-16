
import React, { useRef, useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';
import Main from '../pages/MainPage';
import Confirm from '../pages/Confirm';

export default function Navigation() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Main />} />
				<Route path='/main' element={<Main />} />
				<Route path='/confirm' element={<Confirm />} />
			</Route>
		</Routes>
	);
}