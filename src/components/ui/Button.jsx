import React from 'react';


export const Button = React.forwardRef(({ className, variant = 'primary', disabled, children, ...props }, ref) => {
  const baseStyles = 'w-full py-3 px-4 rounded-md font-semibold text-center transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-dark',
    secondary: 'bg-brand-light text-brand-dark hover:bg-[#c2b0f4]',
  };

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = 'Button';
