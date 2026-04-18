interface StatCardProps {
  label: string;
  value: string | number;
  detail?: string;
  icon: React.ElementType;
  iconColor?: string;
}

export function StatCard({ label, value, detail, icon: Icon, iconColor = 'text-indigo-600' }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
      <div className={`mt-1 ${iconColor}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-3xl font-semibold text-gray-900 mt-1">{value}</p>
        {detail && <p className="text-xs text-gray-400 mt-1">{detail}</p>}
      </div>
    </div>
  );
}
