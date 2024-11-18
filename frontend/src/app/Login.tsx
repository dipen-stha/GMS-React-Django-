import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { AppDispatch } from "../redux/store"
import { useNavigate } from "react-router-dom"
import { login } from "../redux/authActions"


const Login = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = {username, password}
            dispatch(
                login(data)
            )
            navigate('/')
        } catch (error) {
            console.error("Login Failed", error)
            navigate('/')
        }
    }

  return (
        <div className="h-screen flex flex-col justify-center items-center">
            <span className="text-3xl text-white text-center mb-6">Login Form</span>
            <div className="h-[250px] w-96 flex justify-center items-center bg-white rounded-lg shadow-lg p-6">  
            <form className="w-full" onSubmit={handleSubmit}>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td  className="pb-4">
                                <input type="text" placeholder="Enter the username" className="input-field w-full" value={username} onChange={(e) => setUserName(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td className="pb-4">
                                <input type="password" placeholder="Enter the password" className="input-field w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <button type="submit" className="bg-indigo-600 py-2 w-full rounded-lg text-white text-2xl hover:bg-indigo-700 shadow-md hover:shadow-lg">
                                Login
                </button>
                <div className="text-center mt-4">
                    <span className="text-lg font-semibold">
                        Not registered? <Link to="/signup" className="text-emerald-500">Signup</Link>
                    </span>
                </div>
            </form>
            </div>
        </div>
  )
}

export default Login