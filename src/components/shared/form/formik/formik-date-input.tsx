import React from 'react';
import { useFormikContext } from 'formik';
import { FormDateInputProps, FormDateInput } from '../form-date-input';
import { safeGetValue, shouldShowError, safeGetError } from './formik-helper';

export function FormikDateInput<T = any>(props: FormDateInputProps<T>) {
	const { name, onChange, onBlur, ...rest } = props;
	const formik = useFormikContext<T>();

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
			value={safeGetValue(formik, name, '')}
			onChange={handleChange}
			onBlur={handleBlur}
			showError={shouldShowError(formik, name)}
			error={safeGetError(formik, name)}
		/>
	);
};