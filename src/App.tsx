import './App.scss';
import { useState } from 'react';
import AppContext, { apiDataType } from './components/AppContext';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import View from './components/View/View';

function App() {
	const [apiData, setApiData] = useState<apiDataType>({});

	return (
		<div className='App'>
			<AppContext.Provider value={{ apiData, setApiData }}>
				<Header />
				<Form />
				{apiData.city ? <View /> : null}
			</AppContext.Provider>
		</div>
	);
}

export default App;
