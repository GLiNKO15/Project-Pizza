import React, { useRef, useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import useSWR from 'swr';

import Navigation from '../routes/Routes'
import '../styles/mobile.module.css';

import '../style.css';

export default function App() {
	return (
		<>
			<Navigation></Navigation>
		</>
	);
}