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
    console.log(form)
    try {
      const response = await axios.post<{ message: string }>('http://192.168.4.45:3000/api/login', form)
     // console.log(response.data)
      let responseString = response.data.message.toString()
      setCookie('Token', responseString, { expires: 7 })
      setCookie('Username', form.username, { expires: 7 });
      router.push('/account')
    } catch (error) {
      setError(error.response.data.error)
    }
  }

  return (
    
<form onSubmit={handleSubmit} className="futuristic-form">

<style jsx>{`
.futuristic-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.form-title {
  color: #000;
  font-size: 36px;
  margin-bottom: 30px;
}

.form-group {
  position: relative;
  margin-bottom: 25px;
}

.form-label {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: #000;
  font-size: 24px;
  pointer-events: none;
  transition: all 0.3s ease;
}

.form-input {
  width: 400px;
  height: 50px;
  padding: 20px 60px 20px 50px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: #000;
  font-size: 20px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.2);
}

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
  top: 10px;
  left: 10px;
  font-size: 16px;
}

.form-btn {
  width: 400px;
  height: 60px;
  border: none;
  border-radius: 30px;
  background: #00bfff;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-btn:hover {
  background: #fff;
  color: #00bfff;
}
.form-error {
  color: #ff0000;
  font-size: 16px;
}

      `}</style>
  <h2 className="form-title">Login</h2>
  <div className="form-group">
    <label htmlFor="username" className="form-label">
      Username
    </label>
    <input
      type="text"
      id="username"
      value={form.username}
      onChange={(e) => setForm({ ...form, username: e.target.value })}
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="password" className="form-label">
      Password
    </label>
    <input
      type="password"
      id="password"
      value={form.password}
      onChange={(e) => setForm({ ...form, password: e.target.value })}
      className="form-input"
    />
  </div>
  {error && <p className="form-error">{error}</p>}
  <button type="submit" className="form-btn">Log in</button>
</form>

  )
}
