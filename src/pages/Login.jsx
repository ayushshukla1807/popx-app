import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authSchema';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [authError, setAuthError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setAuthError('');
    const { error } = await signIn({ email: data.email, password: data.password });
    
    if (error) {
      setAuthError(error.message);
    } else {
      navigate('/profile');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full w-full p-6 pt-12"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Signin to your<br/>PopX account</h1>
        <p className="text-gray-500 text-base">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit,
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <div className="space-y-1">
          <Input 
            label="Email Address" 
            type="email" 
            {...register('email')} 
            error={errors.email?.message} 
          />
          <Input 
            label="Password" 
            type="password" 
            {...register('password')} 
            error={errors.password?.message} 
          />
        </div>

        {authError && <p className="text-sm text-red-500 mt-2">{authError}</p>}

        <div className="mt-auto pb-8">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
