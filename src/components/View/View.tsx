import AppContext from '../AppContext';
import { useContext } from 'react';

const View = () => {
	const context = useContext(AppContext);
	const d = context?.apiData;

	const content = d?.aqius ? (
		<>
			<img src={d?.ic} alt='' className='main__icon' />
			<p className='main__time'>
				Stan na: {d?.ts?.replace('T', ' ').slice(0, d?.ts.length - 8)}
			</p>
			<div
				className='main__aq'
				style={{ background: `${d?.aqInfo && d?.aqInfo.color}` }}>
				<p className='main__aq-title'>
					Jakość powietrza{' '}
					<span className='main__aq-title--span'>{d?.aqius}</span> US AQI
				</p>
				<p className='main__aq-title-index'>{d?.aqInfo && d?.aqInfo.title}</p>
				<p className='main__aq-info'>{d?.aqInfo && d?.aqInfo.info}</p>
			</div>
			<p className='main__temp'>{`${d?.tp} \u00b0C`}</p>
			<p className='main__pressure'>Ciśnienie {d?.pr}hPa</p>
			<div className='main__wind'>
				<p className='main__wind-speed'>
					Wiatr {d?.ws && (d?.ws * (0.001 / (1 / 3600))).toFixed(1)}km/h
				</p>
				<img
					src={'/arrow-up.png'}
					alt=''
					className='main__wind-direction'
					style={{ transform: `rotate(-${d?.wd ? d?.wd : 0}deg)` }}
				/>
				<p className='main__humidity'>Wilgotność powietrza {d?.hu}%</p>
			</div>
		</>
	) : (
		<p className='main__no-info'>Aktualnie brak informacji o tym mieście</p>
	);

	return (
		<main className='main'>
			<h2 className='main__city'>{d?.city}</h2>
			{content}
		</main>
	);
};

export default View;
export {};
