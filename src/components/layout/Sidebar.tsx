import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  ChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const mainNav = [
  { to: '/', label: 'Dashboard', icon: HomeIcon, end: true },
  { to: '/students', label: 'Students', icon: AcademicCapIcon },
  { to: '/enrollment', label: 'Enrollment', icon: ClipboardDocumentListIcon },
  { to: '/courses', label: 'Courses', icon: BookOpenIcon },
  { to: '/attendance', label: 'Attendance', icon: CalendarDaysIcon },
  { to: '/payments', label: 'Payments', icon: BanknotesIcon },
  { to: '/reports', label: 'Reports', icon: ChartBarIcon },
];

const adminNav = [
  { to: '/users', label: 'Users', icon: UserCircleIcon },
  { to: '/settings', label: 'Settings', icon: Cog6ToothIcon },
];

function NavItem({ to, label, icon: Icon, end }: { to: string; label: string; icon: React.ElementType; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-indigo-50 text-indigo-700'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      <Icon className="w-5 h-5 shrink-0" />
      {label}
    </NavLink>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-5 py-5 border-b border-gray-100">
        <span className="text-lg font-semibold text-indigo-700 tracking-tight">Colleger</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
        {mainNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        <div className="my-3 border-t border-gray-100" />

        {adminNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      <div className="px-5 py-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">v1.0</span>
      </div>
    </aside>
  );
}
