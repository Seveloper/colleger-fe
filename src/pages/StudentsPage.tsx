import { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent } from '../hooks/useStudents';
import { StudentDrawer } from '../components/students/StudentDrawer';
import { type Student, type StudentRequest } from '../api/students';

const statusLabels: Record<number, { label: string; cls: string }> = {
  0: { label: 'In Creation',   cls: 'bg-gray-100 text-gray-600' },
  2: { label: 'New',           cls: 'bg-blue-100 text-blue-700' },
  3: { label: 'Preselected',   cls: 'bg-yellow-100 text-yellow-700' },
  4: { label: 'Pre-Enrolled',  cls: 'bg-orange-100 text-orange-700' },
  5: { label: 'Enrolled',      cls: 'bg-green-100 text-green-700' },
  6: { label: 'Withdrawn',     cls: 'bg-red-100 text-red-700' },
  7: { label: 'Graduated',     cls: 'bg-purple-100 text-purple-700' },
};

export function StudentsPage() {
  const [search, setSearch]           = useState('');
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [editing, setEditing]         = useState<Student | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<Student | undefined>();

  const { data: students = [], isLoading } = useStudents(search || undefined);
  const createMutation  = useCreateStudent();
  const updateMutation  = useUpdateStudent(editing?.id ?? 0);
  const deleteMutation  = useDeleteStudent();

  const isPending = createMutation.isPending || updateMutation.isPending;

  function openCreate() {
    setEditing(undefined);
    setDrawerOpen(true);
  }

  function openEdit(s: Student) {
    setEditing(s);
    setDrawerOpen(true);
  }

  function handleSubmit(data: StudentRequest) {
    if (editing) {
      updateMutation.mutate(data, { onSuccess: () => setDrawerOpen(false) });
    } else {
      createMutation.mutate(data, { onSuccess: () => setDrawerOpen(false) });
    }
  }

  function confirmDelete(s: Student) {
    setDeleteTarget(s);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(undefined) });
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Students</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Student
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 w-72">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search by name or enrollment…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <th className="px-6 py-3">Enrollment</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">Loading…</td>
              </tr>
            )}
            {!isLoading && students.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">No students found.</td>
              </tr>
            )}
            {students.map(s => {
              const status = statusLabels[s.studentStatus] ?? { label: 'Unknown', cls: 'bg-gray-100 text-gray-500' };
              return (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-mono text-gray-700">{s.enrollment}</td>
                  <td className="px-6 py-3 text-gray-800">
                    {s.firstLastName}{s.secondLastName ? ` ${s.secondLastName}` : ''}, {s.firstName}{s.middleName ? ` ${s.middleName}` : ''}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{s.currentCourseId}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.cls}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(s)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(s)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create / Edit drawer */}
      <StudentDrawer
        open={drawerOpen}
        student={editing}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        isPending={isPending}
      />

      {/* Delete confirmation */}
      {deleteTarget && (
        <>
          <div className="fixed inset-0 bg-black/30 z-20" onClick={() => setDeleteTarget(undefined)} />
          <div className="fixed inset-0 z-30 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-2">Delete student?</h3>
              <p className="text-sm text-gray-500 mb-6">
                <span className="font-medium">{deleteTarget.firstName} {deleteTarget.firstLastName}</span> will be deactivated. This action can be reversed by an admin.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteTarget(undefined)}
                  className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="text-sm bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {deleteMutation.isPending ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
