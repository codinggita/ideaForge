import React, { useState } from 'react';
import { Loader2, LockKeyhole, ShieldCheck } from 'lucide-react';

export default function SecurityForm({ userInfo, updateProfile }) {
  const hasPassword = Boolean(userInfo?.hasPassword);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const resetFields = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (hasPassword && !currentPassword.trim()) {
      setMessageType('error');
      setMessage('Enter your current password to continue.');
      return;
    }

    if (newPassword.length < 6) {
      setMessageType('error');
      setMessage('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessageType('error');
      setMessage('New password and confirmation do not match.');
      return;
    }

    setLoading(true);

    try {
      await updateProfile({
        currentPassword: currentPassword || undefined,
        password: newPassword,
      });
      setMessageType('success');
      setMessage(hasPassword ? 'Password updated successfully.' : 'Password added successfully.');
      resetFields();
    } catch (err) {
      setMessageType('error');
      setMessage(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-2xl">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-primary">Security</h2>
            <p className="text-sm text-slate-500 mt-1">
              Keep your account protected with a strong password and sign-in checks.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            Account secure
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary">
              <LockKeyhole className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">
                {hasPassword ? 'Password login is active' : 'Password login is not set yet'}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {hasPassword
                  ? 'Use your current password to rotate credentials safely.'
                  : userInfo?.googleConnected
                    ? 'You signed up with Google. Add a password if you want email/password login too.'
                    : 'Add a password so you can sign in securely from any device.'}
              </p>
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`p-4 mb-6 rounded-xl border text-sm font-medium ${
              messageType === 'success'
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {hasPassword && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-xl border border-[#d8e0e8] bg-white px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                required
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {hasPassword ? 'New Password' : 'Create Password'}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border border-[#d8e0e8] bg-white px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                minLength={6}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-[#d8e0e8] bg-white px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                minLength={6}
                required
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-500">
            Use at least 6 characters. For stronger protection, mix upper and lower case letters, numbers, and symbols.
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={resetFields}
              className="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 flex items-center gap-2 text-sm font-semibold text-white bg-primary rounded-xl shadow-[0_8px_16px_rgba(53,82,125,0.15)] hover:bg-[#2c4567] transition-colors disabled:opacity-70"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {hasPassword ? 'Update Password' : 'Save Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
