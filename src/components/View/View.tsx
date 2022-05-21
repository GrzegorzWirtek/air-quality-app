import './View.scss';
import AppContext from '../AppContext';
import { useContext } from 'react';

const View = () => {
	const context = useContext(AppContext);
	const d = context?.apiData;

	const content = d?.aqius ? (
		<>
			<h2 className='main__city'>{d?.city}</h2>
			<p className='main__time'>
				{d?.ts?.replace('T', ' ').slice(0, d?.ts.length - 8)}
			</p>
			<div
				className='main__aq'
				style={{ background: `${d?.aqInfo && d?.aqInfo.color}` }}>
				<div className='main__aq-value'>
					<p className='main__aq-value-number'>{d?.aqius}</p>
					<p className='main__aq-value-text'>US AQI</p>
				</div>
				<p className='main__aq-index'>{d?.aqInfo && d?.aqInfo.title}</p>
				<p className='main__aq-info'>{d?.aqInfo && d?.aqInfo.description}</p>
			</div>

			<div className='main__weather'>
				<img src={d?.ic} alt='' className='main__icon' />
				<div className='main__temp-wrapper'>
					<p className='main__temp'>
						{d?.tp}
						<span className='main__temp-span'>{'\u00b0C'}</span>
					</p>
					<img
						src={'/arrow-up.png'}
						alt=''
						className='main__wind-direction'
						style={{ transform: `rotate(${d?.wd ? d?.wd + 180 : 0}deg)` }}
					/>
					<p className='main__wind-speed'>
						Wiatr{' '}
						<strong>
							{d?.ws && (d?.ws * (0.001 / (1 / 3600))).toFixed(1)}
						</strong>{' '}
						km/h
					</p>
				</div>
				<div className='main__parameters'>
					<p className='main__pressure'>
						Ciśnienie <strong>{d?.pr}</strong> hPa
					</p>
					<p className='main__humidity'>
						Wilgotność powietrza <strong>{d?.hu}</strong>%
					</p>
				</div>
			</div>
		</>
	) : d?.city ? (
		<p className='main__no-info'>Brak danych, spróbuj za chwilę</p>
	) : null;

	return <main className='main'>{content}</main>;
};

export default View;
export {};
