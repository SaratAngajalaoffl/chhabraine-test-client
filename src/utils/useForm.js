import { useState } from 'react';

const useForm = (ini) => {
	const [state, setstate] = useState(ini);

	const HandleChange = (e) => {
		setstate((oldval) => ({
			...oldval,
			[e.target.name]: e.target.value,
		}));
	};

	const HandleChangebyValue = (e) => {
		setstate((oldval) => ({
			...oldval,
			...e,
		}));
	};

	const HandleReset = (resetval = ini) => {
		setstate(resetval);
	};

	return [state, HandleChange, HandleChangebyValue, HandleReset];
};

export default useForm;
