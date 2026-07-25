import React from 'react';
import { useShop } from '../context/ShopContext';

const Toast = () => {

  const { toast } = useShop();

  // If no toast, render nothing
  if (!toast) return null;

  return (
    <>
      {/* Toast Notification */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#323232',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        fontSize: '16px',
        fontWeight: '500',
        zIndex: 9999,
        animation: 'slideIn 0.3s ease-out',
        minWidth: '200px',
        textAlign: 'center'
      }}>
        {toast}
      </div>

      {/* Animation Style */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes cartBounce {
          0% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(0.95); }
          75% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default Toast;