import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

const STORAGE_KEY = 'stashu_notifications';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotifications(parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }, []);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Auto-generate notifications based on financial patterns
  const generateSmartNotifications = (totalIncome: number, totalExpenses: number, balance: number) => {
    const lastNotification = notifications[0];
    const now = new Date();
    
    // Don't generate too frequently
    if (lastNotification && (now.getTime() - lastNotification.timestamp.getTime()) < 24 * 60 * 60 * 1000) {
      return;
    }

    // Low balance warning
    if (balance < 100 && balance > 0) {
      addNotification({
        title: 'Low Balance Alert',
        message: `Your balance is getting low at $${balance.toFixed(2)}. Consider reducing expenses or adding income.`,
        type: 'warning'
      });
    }

    // Negative balance alert
    if (balance < 0) {
      addNotification({
        title: 'Overdraft Warning',
        message: `You're spending more than you earn! Current balance: $${balance.toFixed(2)}`,
        type: 'error'
      });
    }

    // High spending alert
    if (totalExpenses > totalIncome * 0.8) {
      addNotification({
        title: 'High Spending Alert',
        message: `You're spending ${((totalExpenses / totalIncome) * 100).toFixed(0)}% of your income. Consider budgeting.`,
        type: 'warning'
      });
    }

    // Good savings rate
    if (balance > totalIncome * 0.2 && totalIncome > 0) {
      addNotification({
        title: 'Great Job!',
        message: `You're saving ${((balance / totalIncome) * 100).toFixed(0)}% of your income. Keep it up!`,
        type: 'success'
      });
    }
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    unreadCount,
    generateSmartNotifications
  };
}
