import React, { useContext, useState } from 'react';
import AppContext from '../AppContext';
import { STATES, CITIES } from '../../sources/cities';
import getApi from '../getApi';

const Form = () => {
	const [inputValue, setInputValue] = useState('');
	const [cities, setCities] = useState<typeof CITIES>([]);
	const dataContext = useContext(AppContext);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let v = e.target.value.toLowerCase();
		setInputValue(e.target.value);
		const matched = CITIES.filter((city) => city.c.toLowerCase().includes(v));
		if (e.target.value) {
			setCities(matched);
		} else setCities([]);
	};

	const handleSelect = async (e: { c: string; s: number }) => {
		let cityApiName = e.c
			.normalize('NFD')
			.replace(/\p{Diacritic}/gu, '')
			.replace(/Ł/g, 'L')
			.replace(/ł/g, 'l');
		if (cityApiName === 'Warszawa') {
			cityApiName = 'Warsaw';
		} else if (cityApiName === 'Kazimierz Wielki') {
			cityApiName = 'Kazimierza Wielka';
		}
		setInputValue(e.c);
		setCities([]);
		const weatherData = await getApi(cityApiName, STATES[e.s]);
		dataContext?.setApiData({ city: e.c, ...weatherData });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setInputValue('');
		setCities([]);
		dataContext?.setApiData({});
	};

	const prompts = cities.map(
		(city, index) =>
			index < 10 && (
				<li
					key={city.c}
					onClick={() => handleSelect(city)}
					className='form__prompt'>
					{city.c}
				</li>
			),
	);

	return (
		<form className='form' onSubmit={handleSubmit}>
			<input
				type='text'
				className='form__input'
				value={inputValue}
				onChange={(e) => handleChange(e)}
			/>
			<button className='form__button'>Clear</button>
			<ul className='form__prompts'>{cities.length ? prompts : null}</ul>
		</form>
	);
};

export default Form;
export {};
