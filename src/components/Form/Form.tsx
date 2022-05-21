import './Form.scss';
import React, { useContext, useRef, useState } from 'react';
import AppContext from '../AppContext';
import { STATES, CITIES } from '../../sources/cities';
import getApi from '../getApi';

type PropsType = {
	setSpinner: (e: boolean) => void;
};

const Form: React.FC<PropsType> = (props) => {
	const [inputValue, setInputValue] = useState('');
	const [cities, setCities] = useState<typeof CITIES>([]);
	const dataContext = useContext(AppContext);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleFocus = () => {
		inputRef.current!.select();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let v = e.target.value.toLowerCase();
		setInputValue(e.target.value);
		const matched = CITIES.filter((city) => city.c.toLowerCase().includes(v));
		if (e.target.value) {
			setCities(matched);
		} else setCities([]);
	};

	const handleSelect = async (e: { c: string; s: number }) => {
		props.setSpinner(true);
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
		props.setSpinner(false);
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
					data-number={city.s}
					tabIndex={0}
					key={city.c}
					onClick={() => handleSelect(city)}
					className='form__prompt'>
					{city.c}
				</li>
			),
	);

	return (
		<form className='form' onSubmit={handleSubmit} tabIndex={-1}>
			<input
				tabIndex={-1}
				className='form__input'
				type='text'
				placeholder='Wyszukaj miasto'
				ref={inputRef}
				value={inputValue}
				onChange={(e) => handleChange(e)}
				onClick={handleFocus}
			/>
			<button tabIndex={-1} className='form__button'>
				<img
					tabIndex={-1}
					src='/close-icon.svg'
					alt=''
					className='form__button-img'
				/>
			</button>
			<ul className='form__prompts'>{cities.length ? prompts : null}</ul>
		</form>
	);
};

export default Form;
export {};
