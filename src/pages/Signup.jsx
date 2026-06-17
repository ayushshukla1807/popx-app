import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schemas/authSchema';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

export const Signup = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [authError, setAuthError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data) => {
    setAuthError('');
    // The trigger will handle adding the user to the profiles table
    // We pass the extra data in user_metadata, the trigger will extract it
    const { error } = await signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone: data.phone,
          company: data.company,
          is_agency: data.isAgency === 'yes',
        }
      }
    });

    if (error) {
      setAuthError(error.message);
    } else {
      // Auto redirect to profile on success
      navigate('/profile');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full w-full p-6 pt-12 overflow-y-auto"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create your<br/>PopX account</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <div className="space-y-1 mb-6">
          <Input label="Full Name" required {...register('fullName')} error={errors.fullName?.message} />
          <Input label="Phone number" required {...register('phone')} error={errors.phone?.message} />
          <Input label="Email address" type="email" required {...register('email')} error={errors.email?.message} />
          <Input label="Password" type="password" required {...register('password')} error={errors.password?.message} />
          <Input label="Company name" required {...register('company')} error={errors.company?.message} />
          
          <div className="pt-2">
            <p className="text-sm font-medium text-gray-900 mb-2">Are you an Agency? <span className="text-red-500">*</span></p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="radio" value="yes" {...register('isAgency')} className="accent-brand w-4 h-4" />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="radio" value="no" {...register('isAgency')} className="accent-brand w-4 h-4" />
                No
              </label>
            </div>
            {errors.isAgency && <p className="text-xs text-red-500 mt-1">{errors.isAgency.message}</p>}
          </div>
        </div>

        {authError && <p className="text-sm text-red-500 mb-4">{authError}</p>}

        <div className="mt-auto pb-4">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
