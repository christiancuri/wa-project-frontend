import React from 'react';

import { InputContainer, InputContainerProps } from './InputContainer';

export function Textarea(
  props: InputContainerProps & React.InputHTMLAttributes<any>,
): JSX.Element {
  return (
    <InputContainer {...props}>
      {({ register }, inputProps) => (
        <textarea {...register(props.name)} {...inputProps} />
      )}
    </InputContainer>
  );
}
