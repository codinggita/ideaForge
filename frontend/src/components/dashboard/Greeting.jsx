import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Greeting() {
  const { userInfo } = useContext(AuthContext);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = userInfo?.name ? userInfo.name.split(' ')[0] : 'User';

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-extrabold text-primary tracking-tight">{getGreeting()}, {firstName} 👋</h2>
      <p className="text-on-surface-variant font-medium mt-1">Here's your business overview for today.</p>
    </section>
  );
}
