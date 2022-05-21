import './App.scss';
import { useState } from 'react';
import AppContext, { apiDataType } from './components/AppContext';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import View from './components/View/View';
import Footer from './components/Footer/Footer';
import Spinner from './components/Spinner/Spinner';

function App() {
	const [apiData, setApiData] = useState<apiDataType>({});
	const [spinner, setSpinner] = useState(false);

	return (
		<div className='App'>
			<AppContext.Provider value={{ apiData, setApiData }}>
				{spinner && <Spinner />}
				<Header />
				<Form setSpinner={setSpinner} />
				<View />
				<Footer />
			</AppContext.Provider>
		</div>
	);
}

export default App;
