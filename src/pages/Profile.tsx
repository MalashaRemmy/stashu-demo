import { useAuth } from '../components/lib/hooks/useAuth';
import { Button, Input } from '../components/ui';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../components/services/userService';

// (Removed duplicate updateUserProfile and related code)

// Profile component
import React, { useState } from 'react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await updateUserProfile({
        userId: user?.id || '',
        name: formData.name,
        email: formData.email
      });
      // Optionally refresh user data here
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
          User Profile
        </h2>
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;