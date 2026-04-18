import { AcademicCapIcon, ClipboardDocumentListIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { StatCard } from '../components/ui/StatCard';

const recentStudents = [
  { id: 1, name: 'José Alberto Pérez', course: 'Grade 5A', time: '2m ago' },
  { id: 2, name: 'María López', course: 'Grade 3B', time: '1h ago' },
  { id: 3, name: 'Carlos Díaz', course: 'Grade 7A', time: '3h ago' },
];

export function DashboardPage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">{greeting}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Total Students"
          value="1,248"
          detail="+4 registered today"
          icon={AcademicCapIcon}
          iconColor="text-indigo-600"
        />
        <StatCard
          label="Enrollment"
          value="423"
          detail="Current school year"
          icon={ClipboardDocumentListIcon}
          iconColor="text-emerald-600"
        />
        <StatCard
          label="Payments Due"
          value="12"
          detail="RD$48,000 pending"
          icon={BanknotesIcon}
          iconColor="text-amber-500"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Recent Students</h2>
          <a href="/students" className="text-xs text-indigo-600 hover:underline">View all →</a>
        </div>
        <ul className="divide-y divide-gray-50">
          {recentStudents.map((s) => (
            <li key={s.id} className="px-6 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{s.name}</p>
                <p className="text-xs text-gray-400">{s.course}</p>
              </div>
              <span className="text-xs text-gray-400">{s.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
