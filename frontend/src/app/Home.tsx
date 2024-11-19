import { useGetUserDetailsQuery } from "../redux/authService"
import { useAuthState } from "../hooks/useAuth";

const Home = () => {
  
  let user = localStorage.getItem("user");
  if (user) {
    let userObj = JSON.parse(user)
    const {data} = useGetUserDetailsQuery(userObj.pk);
    console.log(data)
  }
  return (
    <>
    <div className="text-white">
      <span className="text-2xl text-white"></span>
    </div>
    </>
  )
}

export default Home