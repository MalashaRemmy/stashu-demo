import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/hooks/useAuth'; // Assuming you have an auth context

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth(); // Get user data and logout function from auth context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Extract initials from user's name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="header">
      <button className="mobile-menu-btn" id="mobileMenuBtn">
        <i className="fas fa-bars"></i>
      </button>
      
      <h1>Dashboard Overview</h1>
      
      <div className="user-menu">
        <div className="welcome-message">
          Welcome, <span className="user-name">{user?.name || 'User'}</span>
        </div>
        
        <div 
          className="user-avatar" 
          onClick={() => setShowDropdown(!showDropdown)}
          style={{ backgroundColor: '#4361ee' }} // Using primary color
        >
          {user?.name ? getInitials(user.name) : 'U'}
          
          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-item" onClick={() => navigate('/profile')}>
                <i className="fas fa-user"></i> Profile
              </div>
              <div className="dropdown-item" onClick={() => navigate('/settings')}>
                <i className="fas fa-cog"></i> Settings
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}