export function getUserAvatar(userInfo) {
  if (userInfo?.avatarUrl) return userInfo.avatarUrl;

  const name = userInfo?.name || userInfo?.email || 'User';
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=1E3A5F&color=fff&size=160&bold=true`;
}
