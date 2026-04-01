import React from 'react';
import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ icon: Icon, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white shadow-sm hover:bg-white/10 transition-colors active:scale-95"
    >
      <Icon size={20} />
    </button>
  );
};

export default AuthSocialButton;