import React from 'react';

export const Input = React.forwardRef(({ className, label, error, type = 'text', ...props }, ref) => {
  return (
    <div className="relative w-full mb-4">
      {/* Container with border */}
      <div className={`relative w-full border rounded-md px-3 pb-1.5 pt-4 transition-colors focus-within:border-brand ${error ? 'border-red-500' : 'border-gray-300'} bg-white`}>
        <input
          ref={ref}
          type={type}
          className={`peer w-full bg-transparent text-gray-900 outline-none text-base placeholder-transparent focus:outline-none`}
          placeholder={label}
          {...props}
        />
        <label className={`absolute left-3 top-2 text-xs text-brand font-medium transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand`}>
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';
