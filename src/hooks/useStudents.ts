import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { studentsApi, type StudentRequest } from '../api/students';

const QUERY_KEY = 'students';

export function useStudents(search?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, search],
    queryFn: () => studentsApi.getAll(search),
  });
}

export function useCreateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: StudentRequest) => studentsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}

export function useUpdateStudent(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: StudentRequest) => studentsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}

export function useDeleteStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => studentsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
}
