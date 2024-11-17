import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux/store"
import { useNavigate } from "react-router-dom"
import { signup } from "../redux/authService"

const Signup = () => {
  
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = { fname, lname, email, username, password1, password2, gender }
      console.log(data)
      dispatch(signup(data))
      navigate('/login')
    } catch (error) {
      console.error('Sign up failed')
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center overflow-y-auto">
        <span className="text-white text-3xl">Signup Form</span>
        <div className="h-[500px] w-[550px] flex justify-center items-center bg-white rounded-lg mt-4">
        
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
            <tr>
              <td className="pr-2 py-2">
                <input type="text" placeholder="First Name" className="input-field w-full" value={fname} onChange={(e) => setFname(e.target.value)} />
              </td>
              <td className="py-2">
              <input type="text" placeholder="Last Name" className="input-field w-full" value={lname} onChange={(e) => setLname(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="py-2">
                <input type="text" placeholder="abc@email.com" className="input-field w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="py-2">
              <input type="text" placeholder="Username" className="input-field w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
              </td>
            </tr>
            <tr>
            <td className="pr-2 py-2">
                <input type="password" placeholder="Password" className="input-field w-full" value={password1} onChange={(e) => setPassword1(e.target.value)} />
              </td>
              <td className="py-2">
              <input type="password" placeholder="Repeat Password" className="input-field w-full" value={password2} onChange={(e) => setPassword2(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="pr-2 py-2">
                <select className="input-field w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </td>
            </tr>
            </tbody>
          </table>
          <button className="btn-form mt-3">Sign Up</button>
        </form>
          
        </div>
    </div>
  )
}

export default Signup