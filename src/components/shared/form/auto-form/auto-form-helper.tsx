import React from 'react';
import { FormikProps } from "formik";
import { FormikSelect, FormikTagInput, FormikMobilePhone, FormikMultiSelect, FormikCheckBox, FormikInput, FormikDateInput } from "../..";
import FormDisplay from '../form-display';
import { addSpacesOnCaps } from '../../../../helpers/string-helper';
import FormTagDisplay from '../form-tag-display';
import { AutoFormPropertyDefinition, AutoFormRow } from './auto-form-types';
import { ChipProps, toChipProps } from '../../chips/chip';

export const toStackedForm = (fields: AutoFormPropertyDefinition[]) => {
  const rows: AutoFormRow[] = [];
  if (!fields) return rows;
  fields.forEach((f) => rows.push({ columns: [{ field: f }] }));
  return rows;
};

export function renderInputComponent(property: AutoFormPropertyDefinition, formikProps: FormikProps<any>) {

  let sharedProps = {
    disabled: property.options?.disabled ? property.options?.disabled(formikProps.values) : undefined,
    label: property.display,
    formikProps: formikProps,
    name: property.name as any
  };

  if (!sharedProps.label && property.options?.displayFromName) {
    sharedProps.label = addSpacesOnCaps(property.name as string)
  }


  const placeholder = property.options?.placeholder;
  const includeEmptyOption = property.options?.exludeEmptyFirstOptionOnSelect;
  const options = property.options?.options || [];
  const imageData = property.options?.imageData;

  if (property.options?.htmlAttr) sharedProps = { ...sharedProps, ...property.options?.htmlAttr };

  switch (property.type) {
    case 'NumberInput':
      return <FormikInput placeholder={placeholder} type="number" {...sharedProps} />;
    case 'Checkbox':
      return <FormikCheckBox {...sharedProps} />;
    case 'Select':
      return <FormikSelect placeholder={placeholder} includeEmptyOption={includeEmptyOption} options={options} {...sharedProps} />;
    case 'MobilePhone':
      return <FormikMobilePhone placeholder={placeholder} {...sharedProps} />;
    case 'MultiSelect':
      return <FormikMultiSelect placeholder={placeholder} options={options} {...sharedProps} />;
    case 'TagInput':
      return <FormikTagInput {...sharedProps} placeholder={property.options?.placeholder} />;
    case 'TagDisplay':
      let displayTags: ChipProps[] = [];
      if (property.options?.tagOptions?.length) displayTags = property.options?.tagOptions;
      if (!displayTags.length && property.options?.options?.length) displayTags = toChipProps(property.options?.options, (t) => `${t.label}: ${t.value}`);
      return <FormTagDisplay {...sharedProps} tags={displayTags} />;
    case 'PasswordInput':
      return <FormikInput type="password" {...sharedProps} placeholder={property.options?.placeholder} />;
    case 'Captcha':
      return (
        <div>
          <img src={imageData} alt="Captcha" />
          <FormikInput placeholder={placeholder} type="text" {...sharedProps} />
        </div>
      );
    case 'Display':
      return <FormDisplay label={sharedProps.label} text={formikProps.values[property.name]} />;
    case 'DateInput':
      return <FormikDateInput {...sharedProps} placeholder={property.options?.placeholder} />;
    case 'Script':
      break;
    case 'TextInput':
    default:
      return <FormikInput type="text" {...sharedProps} placeholder={property.options?.placeholder} />;
  }
}


