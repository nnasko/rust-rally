"use client"
// AccountSettingsPage.tsx

import React, { useState } from 'react';
import { getSession } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
  discord?: string;
  steam?: string;
  languages?: string;
  region?: string;
  age?: number;
  profileImage?: string;
}

const AccountSettingsPage: React.FC<{ user: User }> = ({ user }) => {
  const [discord, setDiscord] = useState(user?.discord || '');
  const [steam, setSteam] = useState(user?.steam || '');
  const [languages, setLanguages] = useState(user?.languages || '');
  const [region, setRegion] = useState(user?.region || '');
  const [age, setAge] = useState(user?.age || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const session = await getSession();
    if (!session) {
      // Handle error: User is not authenticated
      return;
    }
    try {
      // Call API to update user profile with new data
      const res = await fetch(`/api/user/update?userId=${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discord, steam, languages, region, age, profileImage }),
      });
      if (res.ok) {
        // Handle success
        console.log('User data updated successfully');
      } else {
        // Handle error
        console.error('Failed to update user data:', await res.text());
      }
    } catch (error) {
      // Handle network or server errors
      console.error('Error updating user data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={discord}
        onChange={(e) => setDiscord(e.target.value)}
        placeholder="Discord"
      />
      <input
        type="text"
        value={steam}
        onChange={(e) => setSteam(e.target.value)}
        placeholder="Steam"
      />
      <input
        type="text"
        value={languages}
        onChange={(e) => setLanguages(e.target.value)}
        placeholder="Languages"
      />
      <input
        type="text"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        placeholder="Region"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        placeholder="Age"
      />
      <input
        type="text"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
        placeholder="Profile Image URL"
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default AccountSettingsPage;
