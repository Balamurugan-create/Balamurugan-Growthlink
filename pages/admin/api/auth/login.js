import { client } from '../../../lib/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    const user = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}