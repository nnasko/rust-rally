// pages/api/user/update.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '@/lib/actions/authActions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Extract user ID from the request query parameters
    const { userId } = req.query;

    // Extract updated user data from the request body
    const userData = req.body;

    // Call updateUser function to update user data
    await updateUser(userId as string, userData);

    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
