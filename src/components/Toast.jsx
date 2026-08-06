import React from 'react';
import { useShop } from '../context/ShopContext';

const Toast = () => {
  const { toast } = useShop();

  if (!toast) return null;

  const isString = typeof toast === 'string';
  const message = isString ? toast : toast.message;
  const type = isString ? 'success' : (toast.type || 'success');

  const getBorderColor = () => {
    if (type === 'danger') return 'rgba(239, 68, 68, 0.5)';
    if (type === 'warning') return 'rgba(245, 158, 11, 0.5)';
    return 'rgba(139, 92, 246, 0.5)';
  };

  const getGlowColor = () => {
    if (type === 'danger') return 'rgba(239, 68, 68, 0.25)';
    if (type === 'warning') return 'rgba(245, 158, 11, 0.25)';
    return 'rgba(139, 92, 246, 0.25)';
  };

  return (
    <div
      className="animate-fadeIn"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        color: '#ffffff',
        padding: '14px 22px',
        borderRadius: '14px',
        border: `1px solid ${getBorderColor()}`,
        boxShadow: `0 10px 30px -5px ${getGlowColor()}`,
        fontSize: '14px',
        fontWeight: '600',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      <span>{message}</span>
    </div>
  );
};

export default Toast;