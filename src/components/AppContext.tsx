import { createContext } from 'react';

export type apiDataType = {
	city?: string;
	aqius?: number;
	aqInfo?: {
		color?: string;
		title?: string;
		info?: string;
	};
	ts?: string;
	hu?: string;
	ic?: string;
	pr?: number;
	tp?: number;
	wd?: string;
	ws?: number;
};

type dataType = {
	apiData: apiDataType;
	setApiData: React.Dispatch<React.SetStateAction<apiDataType>>;
};

const AppContext = createContext<dataType | null>(null);
export default AppContext;
