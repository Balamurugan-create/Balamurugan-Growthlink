import { client } from '../../../lib/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user in Sanity
    const newUser = await client.create({
      _type: 'user',
      name,
      email,
      password, // In production, make sure to hash the password
      role: 'customer'
    });

    res.status(200).json({ 
      success: true, 
      user: { id: newUser._id, name, email, role: 'customer' }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
}