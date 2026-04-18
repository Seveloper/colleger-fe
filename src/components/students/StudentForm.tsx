import { type Student, type StudentRequest } from '../../api/students';

interface Props {
  initial?: Student;
  onSubmit: (data: StudentRequest) => void;
  isPending: boolean;
}

const genderOptions     = [{ v: 0, l: 'Male' }, { v: 1, l: 'Female' }];
const documentOptions   = [{ v: 1, l: 'RNC' }, { v: 2, l: 'National ID' }, { v: 3, l: 'Passport' }, { v: 4, l: 'Other' }];
const phoneOptions      = [{ v: 0, l: 'Personal' }, { v: 1, l: 'Home' }, { v: 2, l: 'Work' }, { v: 3, l: 'Mobile' }];
const maritalOptions    = [{ v: 0, l: 'Single' }, { v: 1, l: 'Married' }, { v: 2, l: 'Civil Union' }, { v: 3, l: 'Other' }];
const shiftOptions      = [{ v: 0, l: 'Morning' }, { v: 1, l: 'Afternoon' }, { v: 2, l: 'Evening' }];
const enrollTypeOptions = [{ v: 0, l: 'Normal' }, { v: 1, l: 'Additional Services' }];
const admFeeOptions     = [{ v: 1, l: 'Generate' }, { v: 2, l: 'Generate for Later Settlement' }, { v: 3, l: 'Do Not Generate' }];
const circularOptions   = [{ v: 0, l: 'By Level Only' }, { v: 1, l: 'Always Send' }, { v: 2, l: 'Never Send' }];

function empty(): StudentRequest {
  return {
    firstName: '', middleName: '', firstLastName: '', secondLastName: '',
    enrollment: '', nationalId: '', ministryId: '', photo: '',
    email: '', phone: '', comment: '',
    gender: 0, documentType: 2, phoneType: 0, maritalStatus: 0,
    preferredShift: 0, enrollmentType: 0, admissionFeeAction: 1, circularSending: 0,
    nationalityId: 1, familyId: 0, currentCourseId: 0, accountId: 0, receiptTypeId: 1,
    siblingNumber: 1, orderNumber: 0,
    birthDate: '', registrationDate: '',
    allergies: '', illnesses: '', healthCondition: '', otherDifficulties: '', healthComment: '',
    hasConcession: false, hasMedicalLicense: false, hasPendings: false,
    allowPreviousYearsGrading: false, doesNotRequireAdmission: false,
    medicalReferenceId: undefined, taxpayerId: undefined,
    previousSchoolId: undefined, birthCityId: undefined, bloodTypeId: undefined,
  };
}

function toFormState(s: Student): StudentRequest {
  return {
    firstName: s.firstName, middleName: s.middleName ?? '', firstLastName: s.firstLastName,
    secondLastName: s.secondLastName ?? '', enrollment: s.enrollment,
    nationalId: s.nationalId ?? '', ministryId: s.ministryId ?? '', photo: s.photo ?? '',
    email: s.email ?? '', phone: s.phone ?? '', comment: s.comment ?? '',
    gender: s.gender, documentType: s.documentType, phoneType: s.phoneType,
    maritalStatus: s.maritalStatus, preferredShift: s.preferredShift,
    enrollmentType: s.enrollmentType, admissionFeeAction: s.admissionFeeAction,
    circularSending: s.circularSending, nationalityId: s.nationalityId,
    familyId: s.familyId, currentCourseId: s.currentCourseId, accountId: s.accountId,
    receiptTypeId: s.receiptTypeId, siblingNumber: s.siblingNumber, orderNumber: s.orderNumber,
    birthDate: s.birthDate ? s.birthDate.slice(0, 10) : '',
    registrationDate: s.registrationDate ? s.registrationDate.slice(0, 10) : '',
    allergies: s.allergies ?? '', illnesses: s.illnesses ?? '',
    healthCondition: s.healthCondition ?? '', otherDifficulties: s.otherDifficulties ?? '',
    healthComment: s.healthComment ?? '',
    hasConcession: s.hasConcession, hasMedicalLicense: s.hasMedicalLicense,
    hasPendings: s.hasPendings, allowPreviousYearsGrading: s.allowPreviousYearsGrading,
    doesNotRequireAdmission: s.doesNotRequireAdmission,
    medicalReferenceId: s.medicalReferenceId, taxpayerId: s.taxpayerId,
    previousSchoolId: s.previousSchoolId, birthCityId: s.birthCityId, bloodTypeId: s.bloodTypeId,
  };
}

const inputCls = 'border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500';
const labelCls = 'block text-xs font-medium text-gray-600 mb-1';
const sectionCls = 'mb-6';
const sectionTitleCls = 'text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: number;
  onChange: (v: number) => void;
  options: { v: number; l: string }[];
}) {
  return (
    <Field label={label}>
      <select className={inputCls} value={value} onChange={e => onChange(Number(e.target.value))}>
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </Field>
  );
}

function CheckField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
      <input type="checkbox" className="rounded" checked={checked} onChange={e => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export function StudentForm({ initial, onSubmit, isPending }: Props) {
  const [form, setForm] = React.useState<StudentRequest>(() => initial ? toFormState(initial) : empty());

  function set<K extends keyof StudentRequest>(key: K, value: StudentRequest[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      birthDate: form.birthDate || undefined,
      registrationDate: form.registrationDate || undefined,
      medicalReferenceId: form.medicalReferenceId || undefined,
      taxpayerId: form.taxpayerId || undefined,
      previousSchoolId: form.previousSchoolId || undefined,
      birthCityId: form.birthCityId || undefined,
      bloodTypeId: form.bloodTypeId || undefined,
    };
    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">

        {/* Personal */}
        <div className={sectionCls}>
          <p className={sectionTitleCls}>Personal</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name *">
              <input required className={inputCls} value={form.firstName} onChange={e => set('firstName', e.target.value)} />
            </Field>
            <Field label="Middle Name">
              <input className={inputCls} value={form.middleName} onChange={e => set('middleName', e.target.value)} />
            </Field>
            <Field label="First Last Name *">
              <input required className={inputCls} value={form.firstLastName} onChange={e => set('firstLastName', e.target.value)} />
            </Field>
            <Field label="Second Last Name">
              <input className={inputCls} value={form.secondLastName} onChange={e => set('secondLastName', e.target.value)} />
            </Field>
            <SelectField label="Gender" value={form.gender} onChange={v => set('gender', v)} options={genderOptions} />
            <SelectField label="Document Type" value={form.documentType} onChange={v => set('documentType', v)} options={documentOptions} />
            <Field label="National ID">
              <input className={inputCls} value={form.nationalId} onChange={e => set('nationalId', e.target.value)} />
            </Field>
            <Field label="Birth Date">
              <input type="date" className={inputCls} value={form.birthDate} onChange={e => set('birthDate', e.target.value)} />
            </Field>
            <SelectField label="Marital Status" value={form.maritalStatus} onChange={v => set('maritalStatus', v)} options={maritalOptions} />
            <Field label="Nationality ID *">
              <input required type="number" className={inputCls} value={form.nationalityId} onChange={e => set('nationalityId', Number(e.target.value))} />
            </Field>
          </div>
        </div>

        {/* Contact */}
        <div className={sectionCls}>
          <p className={sectionTitleCls}>Contact</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email">
              <input type="email" className={inputCls} value={form.email} onChange={e => set('email', e.target.value)} />
            </Field>
            <Field label="Phone">
              <input className={inputCls} value={form.phone} onChange={e => set('phone', e.target.value)} />
            </Field>
            <SelectField label="Phone Type" value={form.phoneType} onChange={v => set('phoneType', v)} options={phoneOptions} />
          </div>
        </div>

        {/* Academic */}
        <div className={sectionCls}>
          <p className={sectionTitleCls}>Academic</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Enrollment *">
              <input required className={inputCls} value={form.enrollment} onChange={e => set('enrollment', e.target.value)} />
            </Field>
            <Field label="Ministry ID">
              <input className={inputCls} value={form.ministryId} onChange={e => set('ministryId', e.target.value)} />
            </Field>
            <SelectField label="Preferred Shift" value={form.preferredShift} onChange={v => set('preferredShift', v)} options={shiftOptions} />
            <SelectField label="Enrollment Type" value={form.enrollmentType} onChange={v => set('enrollmentType', v)} options={enrollTypeOptions} />
            <Field label="Current Course ID *">
              <input required type="number" className={inputCls} value={form.currentCourseId} onChange={e => set('currentCourseId', Number(e.target.value))} />
            </Field>
            <Field label="Registration Date">
              <input type="date" className={inputCls} value={form.registrationDate} onChange={e => set('registrationDate', e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Health */}
        <div className={sectionCls}>
          <p className={sectionTitleCls}>Health</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Allergies">
              <input className={inputCls} value={form.allergies} onChange={e => set('allergies', e.target.value)} />
            </Field>
            <Field label="Illnesses">
              <input className={inputCls} value={form.illnesses} onChange={e => set('illnesses', e.target.value)} />
            </Field>
            <Field label="Health Condition">
              <input className={inputCls} value={form.healthCondition} onChange={e => set('healthCondition', e.target.value)} />
            </Field>
            <Field label="Other Difficulties">
              <input className={inputCls} value={form.otherDifficulties} onChange={e => set('otherDifficulties', e.target.value)} />
            </Field>
            <div className="col-span-2">
              <Field label="Health Comment">
                <input className={inputCls} value={form.healthComment} onChange={e => set('healthComment', e.target.value)} />
              </Field>
            </div>
            <CheckField label="Has Medical License" checked={form.hasMedicalLicense} onChange={v => set('hasMedicalLicense', v)} />
          </div>
        </div>

        {/* Administrative */}
        <div className={sectionCls}>
          <p className={sectionTitleCls}>Administrative</p>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Family ID *">
              <input required type="number" className={inputCls} value={form.familyId} onChange={e => set('familyId', Number(e.target.value))} />
            </Field>
            <Field label="Account ID *">
              <input required type="number" className={inputCls} value={form.accountId} onChange={e => set('accountId', Number(e.target.value))} />
            </Field>
            <Field label="Receipt Type ID *">
              <input required type="number" className={inputCls} value={form.receiptTypeId} onChange={e => set('receiptTypeId', Number(e.target.value))} />
            </Field>
            <Field label="Taxpayer ID">
              <input type="number" className={inputCls} value={form.taxpayerId ?? ''} onChange={e => set('taxpayerId', e.target.value ? Number(e.target.value) : undefined)} />
            </Field>
            <Field label="Sibling Number">
              <input type="number" min={1} className={inputCls} value={form.siblingNumber} onChange={e => set('siblingNumber', Number(e.target.value))} />
            </Field>
            <Field label="Order Number">
              <input type="number" min={0} className={inputCls} value={form.orderNumber} onChange={e => set('orderNumber', Number(e.target.value))} />
            </Field>
            <SelectField label="Admission Fee" value={form.admissionFeeAction} onChange={v => set('admissionFeeAction', v)} options={admFeeOptions} />
            <SelectField label="Circular Sending" value={form.circularSending} onChange={v => set('circularSending', v)} options={circularOptions} />
            <Field label="Previous School ID">
              <input type="number" className={inputCls} value={form.previousSchoolId ?? ''} onChange={e => set('previousSchoolId', e.target.value ? Number(e.target.value) : undefined)} />
            </Field>
            <Field label="Birth City ID">
              <input type="number" className={inputCls} value={form.birthCityId ?? ''} onChange={e => set('birthCityId', e.target.value ? Number(e.target.value) : undefined)} />
            </Field>
            <Field label="Blood Type ID">
              <input type="number" className={inputCls} value={form.bloodTypeId ?? ''} onChange={e => set('bloodTypeId', e.target.value ? Number(e.target.value) : undefined)} />
            </Field>
            <div className="col-span-2 flex flex-col gap-2 pt-1">
              <CheckField label="Has Concession" checked={form.hasConcession} onChange={v => set('hasConcession', v)} />
              <CheckField label="Has Pendings" checked={form.hasPendings} onChange={v => set('hasPendings', v)} />
              <CheckField label="Allow Previous Years Grading" checked={form.allowPreviousYearsGrading} onChange={v => set('allowPreviousYearsGrading', v)} />
              <CheckField label="Does Not Require Admission" checked={form.doesNotRequireAdmission} onChange={v => set('doesNotRequireAdmission', v)} />
            </div>
          </div>
          <div className="mt-3">
            <Field label="Comment">
              <textarea rows={2} className={inputCls} value={form.comment} onChange={e => set('comment', e.target.value)} />
            </Field>
          </div>
        </div>

      </div>

      <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
        >
          {isPending ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );
}

// Make React available (used in JSX above)
import React from 'react';
