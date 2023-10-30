
import {Route, Routes} from 'react-router-dom';
import Layout from '../pages/Layout';
import Main from '../pages/MainPage';
import Confirm from '../pages/Confirm';
import Final from '../pages/Final';

export default function Navigation() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Main />} />
				<Route path='/confirm' element={<Confirm />} />
				<Route path='/final' element={<Final />} />
			</Route>
		</Routes>
	);
}