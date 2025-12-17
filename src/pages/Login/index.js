import "./index.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Loader from "../../components/Loader/index.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://api.escuelajs.co/api/v1/auth/login";
    setLoading(true);
    setErrorMsg("");
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      };
      const res = await fetch(url, options);

      const data = await res.json();

      if (res.ok) {
        Cookies.set("token", data.access_token, { expires: 30 });
        navigate("/");
        console.log("fetched data : ", data.access_token);
      } else {
        console.log("data fetching error: ", data);
        setErrorMsg(data.message);
      }
    } catch (error) {
      console.log("login error ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="logo-image-container">
        <img src={logo} alt="image-logo" className="logo-image" />
      </div>
      <div className="form-container">
        <h1>Login</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="email">
            EMAIL
          </label>
          <input
            className="login-input"
            value={email}
            type="email"
            id="email"
            autoComplete="on"
            autoFocus
            disabled
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="login-label" htmlFor="password">
            PASSWORD
          </label>
          <div className="password-container">
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              value={password}
              id="password"
              autoComplete="true"
              disabled
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="eye-button"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {" "}
              {showPassword ? (
                <FaEye className="eye-icon" />
              ) : (
                <FaEyeSlash className="eye-icon" />
              )}
            </button>
          </div>
          <p className="login-error">{errorMsg !== "" ? errorMsg : ""}</p>
          <button className="sigup-button" type="submit">
            {loading ? <Loader /> : "Just Click Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}
