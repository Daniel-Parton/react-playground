import React from 'react';
import { useFormikContext } from 'formik';
import { FormInputProps, FormInput } from '../form-input';
import { safeGetValue, shouldShowError, safeGetError } from './formik-helper';

export function FormikInput<TFormValues = any>(props: FormInputProps<TFormValues>) {
	const { name, onChange, onBlur, ...rest } = props;
	const formik = useFormikContext<TFormValues>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		formik.handleChange(event);
		if (onChange) onChange(event);
	};

	const handleBlur = (event: any) => {
		formik.handleBlur(event);
		if (onBlur) onBlur(event);
	};

	return (
		<FormInput<TFormValues>
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