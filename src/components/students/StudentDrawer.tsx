import { XMarkIcon } from '@heroicons/react/24/outline';
import { type Student, type StudentRequest } from '../../api/students';
import { StudentForm } from './StudentForm';

interface Props {
  open: boolean;
  student?: Student;
  onClose: () => void;
  onSubmit: (data: StudentRequest) => void;
  isPending: boolean;
}

export function StudentDrawer({ open, student, onClose, onSubmit, isPending }: Props) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-20" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-screen w-full max-w-xl bg-white shadow-xl z-30 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">
            {student ? 'Edit Student' : 'New Student'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <StudentForm initial={student} onSubmit={onSubmit} isPending={isPending} />
      </div>
    </>
  );
}
