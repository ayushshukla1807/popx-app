import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full w-full justify-end p-6 pb-12"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to PopX</h1>
        <p className="text-gray-500 text-lg">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit,
        </p>
      </div>
      
      <div className="space-y-4">
        <Button onClick={() => navigate('/register')} variant="primary">
          Create Account
        </Button>
        <Button onClick={() => navigate('/login')} variant="secondary">
          Already Registered? Login
        </Button>
      </div>
    </motion.div>
  );
};
