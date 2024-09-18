import React from 'react';
import './Login.css';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';


const LoginComponent = () => {
    const [email, setEmail]=useState("");
    const [password, setPassword]= useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      };

      const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMinLength = password.length >= 8;
        return (
          hasUpperCase &&
          hasLowerCase &&
          hasNumber &&
          hasSpecialChar &&
          hasMinLength
        );
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        let emailValidationError = "";
        let passwordValidationError = "";
        let valid = false;

        if (!email) {
            emailValidationError = "Email is required";
            setEmailError(emailValidationError);
            return;
          } else if (!validateEmail(email)) {
            emailValidationError = "Invalid email format";
            setEmailError(emailValidationError);
            return;
          }

          if (!password) {
            passwordValidationError = "Password is required";
            setPasswordError(passwordValidationError);
            return;
          } else if (!validatePassword(password)) {
            passwordValidationError =
              "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character";
            setPasswordError(passwordValidationError);
            return;
          }

          
          if(email && password) {
            console.log("Email:", email, "Password:", password);
            navigate("/home");
          }

      };

      return (
        <div>
            <form noValidate onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>
                    Email:
                    <input type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <p style={{ color: "red", margin: 0 }}>{emailError}</p>
                <label>
                    Password:
                    <input type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </label>
                <p style={{ color: "red", padding: 0 }}>{passwordError}</p>

                <button type="submit">Login</button>

            </form>
        </div>
      );
};

export default LoginComponent;