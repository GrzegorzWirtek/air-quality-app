import './Spinner.scss';
import { useState, useEffect } from 'react';

const Spinner = () => {
	const [text, setText] = useState<string>('');
	useEffect(() => {
		const interval = setInterval(() => {
			if (text === '') {
				setText('.');
			} else if (text === '.') {
				setText('..');
			} else if (text === '..') {
				setText('...');
			} else setText('');
		}, 200);

		return () => clearInterval(interval);
	}, [text]);

	return (
		<div className='spinner'>
			<p className='spinner__text'>
				Czekaj<span className='spinner__text'>{text}</span>
			</p>
		</div>
	);
};

export default Spinner;
export {};
