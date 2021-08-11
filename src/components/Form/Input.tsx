import React from 'react';

import { InputContainer, InputContainerProps } from './InputContainer';

export function Input({
  name,
  label,
  icon,
  ...props
}: InputContainerProps & React.HTMLAttributes<any>): JSX.Element {
  return (
    <InputContainer name={name} label={label} icon={icon}>
      {({ register }, inputProps) => (
        <input {...register(name)} {...inputProps} {...props} />
      )}
    </InputContainer>
  );
}
