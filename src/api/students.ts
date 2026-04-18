import { apiClient } from './client';

export interface Student {
  id: number;
  enrollment: string;
  firstName: string;
  middleName?: string;
  firstLastName: string;
  secondLastName?: string;
  email?: string;
  phone?: string;
  phoneType: number;
  gender: number;
  maritalStatus: number;
  nationalId?: string;
  documentType: number;
  birthDate?: string;
  nationalityId: number;
  comment?: string;
  registrationDate?: string;
  ministryId?: string;
  photo?: string;
  preferredShift: number;
  allergies?: string;
  illnesses?: string;
  healthCondition?: string;
  otherDifficulties?: string;
  healthComment?: string;
  siblingNumber: number;
  orderNumber: number;
  hasConcession: boolean;
  hasMedicalLicense: boolean;
  hasPendings: boolean;
  studentStatus: number;
  circularSending: number;
  allowPreviousYearsGrading: boolean;
  admissionFeeAction: number;
  enrollmentType: number;
  doesNotRequireAdmission: boolean;
  familyId: number;
  currentCourseId: number;
  accountId: number;
  medicalReferenceId?: number;
  taxpayerId?: number;
  receiptTypeId: number;
  previousSchoolId?: number;
  birthCityId?: number;
  bloodTypeId?: number;
}

export type StudentRequest = Omit<Student, 'id' | 'studentStatus'>;

export const studentsApi = {
  getAll: (search?: string) =>
    apiClient.get<Student[]>(`/api/v1/students${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  getById: (id: number) =>
    apiClient.get<Student>(`/api/v1/students/${id}`),
  create: (data: StudentRequest) =>
    apiClient.post<{ id: number; enrollment: string }>('/api/v1/students', data),
  update: (id: number, data: StudentRequest) =>
    apiClient.put<Student>(`/api/v1/students/${id}`, data),
  delete: (id: number) =>
    apiClient.delete(`/api/v1/students/${id}`),
};
