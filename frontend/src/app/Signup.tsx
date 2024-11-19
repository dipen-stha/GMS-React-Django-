import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux/store"
import { useNavigate } from "react-router-dom"
import { signup } from "../redux/authActions"

const Signup = () => {
  
  const [first_name, setFname] = useState('')
  const [last_name, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState<string>('MALE')
  const [profile_pic, setPicture] = useState<File | null>()


  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleFileChange = (e: any) => {
    console.log(e.target.files[0])
    setPicture(e.target.files[0])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(password == password2){
      try {
        const data = { first_name, last_name, email, username, password, gender, profile_pic }
        dispatch(signup(data))
        // navigate('/login')
      } catch (error) {
        console.error('Sign up failed')
      }
    } else {
      alert("Passwords don't match")
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
                <input type="text" placeholder="First Name" className="input-field w-full" value={first_name} onChange={(e) => setFname(e.target.value)} />
              </td>
              <td className="py-2">
              <input type="text" placeholder="Last Name" className="input-field w-full" value={last_name} onChange={(e) => setLname(e.target.value)} />
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
                <input type="password" placeholder="Password" className="input-field w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
              </td>
              <td className="py-2">
              <input type="password" placeholder="Repeat Password" className="input-field w-full" value={password2} onChange={(e) => setPassword2(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="pr-2 py-2">
                <select className="input-field w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option disabled>Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHERS">Others</option>
                </select>
              </td>
              <td>
                <input type="file" onChange={handleFileChange}></input>
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