import React, { useState } from 'react';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import api from '../../services/api';
import { showToast } from '../../store/slices/uiSlice';

const meetingSchema = Yup.object({
  title: Yup.string().trim().required('Meeting title is required'),
  date: Yup.string().required('Date is required'),
  startTimeStr: Yup.string().required('Start time is required'),
  endTimeStr: Yup.string().required('End time is required'),
  type: Yup.string().required('Meeting type is required'),
  meetingLink: Yup.string().url('Enter a valid URL').nullable(),
  attendees: Yup.array().of(Yup.string().email('Enter a valid attendee email')),
});

export default function CreateMeetingForm({ onSuccess, onCancel }) {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (values, helpers) => {
    setError(null);

    try {
      const startDateTime = new Date(`${values.date}T${values.startTimeStr}`);
      const endDateTime = new Date(`${values.date}T${values.endTimeStr}`);

      if (endDateTime <= startDateTime) {
        throw new Error('End time must be after start time');
      }

      const { data } = await api.post('/meetings', {
        title: values.title,
        description: values.description,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        type: values.type,
        meetingLink: values.meetingLink || undefined,
        attendees: values.attendees.filter(Boolean),
      });
      dispatch(showToast({ type: 'success', title: 'Meeting scheduled', message: values.title }));
      onSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to schedule meeting');
      dispatch(showToast({ type: 'error', title: 'Meeting failed', message: err.response?.data?.message || err.message }));
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        date: '',
        startTimeStr: '',
        endTimeStr: '',
        type: 'Internal Sync',
        meetingLink: '',
        attendees: [''],
      }}
      validationSchema={meetingSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#243041] mb-1">Meeting Title</label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Client Sync: Fintech Corp"
              className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
            {touched.title && errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['date', 'Date', 'date'],
              ['startTimeStr', 'Start Time', 'time'],
              ['endTimeStr', 'End Time', 'time'],
            ].map(([name, label, type]) => (
              <div key={name}>
                <label className="block text-sm font-medium text-[#243041] mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={values[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
                {touched[name] && errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#243041] mb-1">Type</label>
              <select
                name="type"
                value={values.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 appearance-none"
              >
                <option value="Internal Sync">Internal Sync</option>
                <option value="Client Meeting">Client Meeting</option>
                <option value="Review">Review</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#243041] mb-1">Meeting Link (Optional)</label>
              <input
                type="url"
                name="meetingLink"
                value={values.meetingLink}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. https://zoom.us/j/..."
                className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
              {touched.meetingLink && errors.meetingLink && (
                <p className="mt-1 text-xs text-red-500">{errors.meetingLink}</p>
              )}
            </div>
          </div>

          <FieldArray name="attendees">
            {({ push, remove }) => (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#243041]">Attendees</label>
                  <button
                    type="button"
                    onClick={() => push('')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {values.attendees.map((attendee, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="email"
                        name={`attendees.${index}`}
                        value={attendee}
                        onChange={handleChange}
                        placeholder="teammate@example.com"
                        className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                      {values.attendees.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-2 text-slate-400 hover:text-red-500"
                          title="Remove attendee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </FieldArray>

          <div>
            <label className="block text-sm font-medium text-[#243041] mb-1">Description (Optional)</label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Agenda or notes..."
              rows={2}
              className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-[#64748b] hover:text-[#243041] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-[0_8px_16px_rgba(37,99,235,0.15)] hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Schedule Meeting
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
