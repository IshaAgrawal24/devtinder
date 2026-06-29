import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async() => {
    const res = await axios.post(
      "http://localhost:4000/api/auth/login", 
      {
        email: data.email,
        password: data.password
      },
      {withCredentials: true}
    )
    if(res.status === 200) {
      console.log("Response:", res)
      setData({
        email: "",
        password: ""
  })
    }
  }
    return (
    <div className="card flex justify-center w-[40%] mx-auto my-40">
      <div className="card-body py-10 w-full rounded-lg bg-base-200 shadow-md mx-auto">
        <h2 className="card-title font-600 flex justify-center mb-8">Login to DevTinder</h2>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email ID</legend>
          <input type="text" 
          className="input w-full" 
          placeholder="Enter your email ID" 
          value={data.email} 
          onChange={(e) => {setData({...data, email: e.target.value})}}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input type="text" 
          className="input w-full" 
          placeholder="Enter your password" 
          value={data.password} 
          onChange={(e) => {setData({...data, password: e.target.value})}}
          />
        </fieldset>

        <div className="card-actions justify-center mt-8">
          <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
        </div>

      </div>
    </div>
  )}
export default Login;