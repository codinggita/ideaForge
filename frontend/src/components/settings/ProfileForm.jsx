import React, { useEffect, useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { getUserAvatar } from '../../avatar';

export default function ProfileForm({ userInfo, updateProfile }) {
  const [name, setName] = useState(userInfo?.name || '');
  const [jobTitle, setJobTitle] = useState(userInfo?.jobTitle || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarError, setAvatarError] = useState('');

  useEffect(() => {
    setName(userInfo?.name || '');
    setJobTitle(userInfo?.jobTitle || '');
  }, [userInfo?.name, userInfo?.jobTitle]);

  const handleAvatarPreview = (event) => {
    const file = event.target.files?.[0];
    setAvatarError('');

    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      setAvatarError('Only JPG, PNG, or GIF images are allowed.');
      return;
    }

    if (file.size > 800 * 1024) {
      setAvatarError('Avatar preview must be 800K or smaller.');
      return;
    }

    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await updateProfile({ name, jobTitle });
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-2xl">
        <h2 className="text-lg font-bold text-primary mb-6">Profile Information</h2>
        
        <div className="flex items-center gap-6 mb-8">
          <img
            src={avatarPreview || getUserAvatar(userInfo)}
            alt={userInfo?.name || userInfo?.email || 'User avatar'}
            className="w-20 h-20 rounded-full bg-slate-200 object-cover shadow-inner border border-slate-200"
          />
          <div>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-primary hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
              <ImagePlus className="w-4 h-4" />
              Preview Avatar
              <input
                type="file"
                accept="image/png,image/jpeg,image/gif"
                onChange={handleAvatarPreview}
                className="hidden"
              />
            </label>
            <p className="text-[11px] text-slate-400 mt-2">
              Google/email avatar is used by default. JPG, GIF or PNG preview, max 800K.
            </p>
            {avatarError && <p className="text-[11px] text-red-500 mt-2">{avatarError}</p>}
          </div>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-xl border text-sm font-medium ${message.includes('success') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                defaultValue={userInfo?.email || ''}
                disabled
                className="w-full rounded-xl border border-[#d8e0e8] bg-[#f1f5f9] px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role / Job Title</label>
            <input 
              type="text" 
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Product Manager"
              className="w-full rounded-xl border border-[#d8e0e8] bg-[#f8fafc] px-4 py-2.5 text-sm text-[#243041] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => { setName(userInfo?.name || ''); setJobTitle(userInfo?.jobTitle || ''); }}
              className="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              Discard
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-5 py-2.5 flex items-center gap-2 text-sm font-semibold text-white bg-primary rounded-xl shadow-[0_8px_16px_rgba(53,82,125,0.15)] hover:bg-[#2c4567] transition-colors disabled:opacity-70"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
