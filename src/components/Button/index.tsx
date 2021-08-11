import React, { ButtonHTMLAttributes } from 'react';

import cs from 'classnames';

interface Props extends ButtonHTMLAttributes<any> {
  loading?: boolean;
  color: string;
}

export const Button: React.FC<Props> = ({
  loading,
  color,
  className,
  disabled,
  ...props
}) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...props}
      className={cs('relative btn overflow-hidden', color, className)}
      disabled={loading || disabled}
    >
      {loading && (
        <span className="opacity-0 transition-opacity opacity-100 top-0 left-0 w-full h-full absolute flex items-center justify-center bg-inherit">
          <svg
            className="animate-spin duration-75 -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      Login
    </button>
  );
};
