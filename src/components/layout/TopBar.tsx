import { BellIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { tokenStorage, getTokenPayload } from '../../api/client';

export function TopBar() {
  const navigate = useNavigate();
  const user = getTokenPayload();

  function logout() {
    tokenStorage.clear();
    navigate('/login');
  }

  return (
    <header className="fixed top-0 left-56 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      <div />

      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:text-gray-800 transition-colors">
          <BellIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">{user?.name ?? 'User'}</span>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
