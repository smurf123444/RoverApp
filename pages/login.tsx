import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { setCookie } from 'typescript-cookie';

interface LoginForm {
  username: string,
  password: string,
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ username: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post<{ message: string }>('http://localhost:3000/api/login', form)
      console.log(response.data)
      let responseString = response.data.message.toString()
      setCookie('Token', responseString, { expires: 7 })
      router.push('/account')
    } catch (error) {
      setError(error.response.data.error)
    }
  }

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
      <button type="submit">Log in</button>
    </form>
  )
}
