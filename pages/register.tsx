import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = React.useState<LoginForm>({ username: '', password: '' })
  const [error, setError] = React.useState('');
  const router = useRouter();
  interface LoginForm {
    username: string,
    password: string,
  }
  console.log(form);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/register', form);
      console.log(response.data);
      router.push('/login');
    } catch (error) {
      setError("tits");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}
