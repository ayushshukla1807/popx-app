import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Camera } from 'lucide-react';

export const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (!error && data) {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) return <div className="p-6">Loading profile...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full w-full bg-gray-50"
    >
      <div className="bg-white p-4 shadow-sm z-10 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-900">Account Settings</h1>
        <button onClick={handleLogout} className="text-sm text-red-500 font-medium">Logout</button>
      </div>

      <div className="p-6 pt-8 flex-1">
        <div className="flex gap-4 items-start mb-6">
          <div className="relative">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} 
              alt="Profile avatar" 
              className="w-20 h-20 rounded-full border-2 border-dashed border-brand p-0.5 bg-brand-light"
            />
            <button className="absolute bottom-0 right-0 bg-brand text-white p-1.5 rounded-full border-2 border-white">
              <Camera size={14} />
            </button>
          </div>
          <div className="pt-2">
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              {profile?.full_name || 'User'}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="text-sm text-gray-600 leading-relaxed border-t border-dashed border-gray-300 pt-6">
          <p>
            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
          </p>
        </div>
      </div>
    </motion.div>
  );
};
