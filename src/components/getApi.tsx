import axios from 'axios';
import { INFO } from '../sources/cities';

const API_KEY = process.env.REACT_APP_AIRVISUAL_KEY;
const ICON_URL = 'https://www.airvisual.com/images/';

const chooseIndex = (i: number) => {
	let index = 0;
	if (i <= 50) {
		index = 0;
	} else if (i <= 100) {
		index = 1;
	} else if (i <= 150) {
		index = 2;
	} else if (i <= 200) {
		index = 3;
	} else if (i <= 300) {
		index = 4;
	} else if (i <= 500) {
		index = 5;
	}
	return {
		color: INFO[index].color,
		title: INFO[index].index,
		description: INFO[index].info,
	};
};

const getApi = async (city: string, state: string) => {
	try {
		const weatherDataFromAPI = await axios(
			`http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=Poland&key=${API_KEY}`,
		);
		const { aqius } = weatherDataFromAPI.data.data.current.pollution; //jakość powietrza
		const { ts, hu, ic, pr, tp, wd, ws } =
			weatherDataFromAPI.data.data.current.weather; //ts-czas, hu -wilgotność powietrza %, ic-icon, pr-ciśnienie hpa,tp-temperatura w celciuszach, wd-kierunek wiatru, jako kąt 360° (Północ=0, Wschód=90, Południe=180, Zachód=270), ws-siła wiatru

		const weatherData = {
			aqius,
			aqInfo: chooseIndex(aqius),
			ts,
			hu,
			ic: `${ICON_URL}${ic}.png`,
			pr,
			tp,
			wd,
			ws,
		};

		return weatherData;
	} catch (err) {
		console.log(err);
	}
};

export default getApi;
