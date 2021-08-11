import React from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';

import cn from 'classnames';

export interface InputContainerProps extends React.HTMLProps<any> {
  label?: string;
  name: string;
  icon?: string;
}

interface InputContainerPropsChildren extends InputContainerProps {
  children: (
    form: UseFormReturn,
    props: { className: string; id?: string; name: string },
  ) => JSX.Element;
}

export const InputContainer = (
  props: InputContainerPropsChildren,
): JSX.Element => {
  const { icon, label, name, children, id, className } = props;
  const form = useFormContext();

  return (
    <div className={cn('mb-7', className, 'tw-control')}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="flex">
        {icon && (
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center text-gray-400 text-lg">
            <i className={cn('mdi', icon, 'text-gray-400 text-lg')} />
          </div>
        )}
        {children(form, {
          name,
          id,
          className: cn(
            'w-full tw-field',
            { 'pl-10 -ml-10': !!icon },
            { 'field-touched': form.formState.touchedFields[name] },
            { 'field-untouched': !form.formState.touchedFields[name] },
            { 'field-dirty': form.formState.dirtyFields[name] },
            { 'field-pristine': !form.formState.dirtyFields[name] },
            { 'field-error': form.formState.errors[name] },
          ),
        })}
      </div>
      {form.formState.errors[name] && (
        <p className="validation-message --error">
          {form.formState.errors[name].message}
        </p>
      )}
    </div>
  );
};
