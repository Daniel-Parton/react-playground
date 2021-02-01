import React from 'react';
import { useFormikWithHelper } from "./use-formik-with-helper";
import { FormDateInputProps, FormDateInput } from '../form-date-input';

export function FormikDateInput<T = any>(props: FormDateInputProps<T>) {
	const { name, onChange, onBlur, ...rest } = props;
	const formik = useFormikWithHelper<T>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		formik.handleChange(event);
		if (onChange) onChange(event);
	};

	const handleBlur = (event: any) => {
		formik.handleBlur(event);
		if (onBlur) onBlur(event);
	};

	return (
		<FormDateInput
			{...rest}
			name={name}
			value={formik.getValueFromName(name, '')}
			onChange={handleChange}
			onBlur={handleBlur}
			showError={formik.shouldShowError(name)}
			error={formik.getErrorFromName(name)}
		/>
	);
};