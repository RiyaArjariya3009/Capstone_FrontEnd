/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");

  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const EMAIL_DOMAIN = "nucleusteq.com";

  const validateForm = () => {
    let isValid = true;
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setRoleError("");
    setContactNumberError("");

    if (currState === "Sign Up") {
      if (username.trim() === "") {
        setUsernameError("Username is required");
        isValid = false;
      } else if (username.length < 3) {
        setUsernameError("Username characters must be greater than 3");
        isValid = false;
      }

      if (contactNumber.trim() === "") {
        setContactNumberError("Contact number is mandatory");
        isValid = false;
      } else if (contactNumber.length !== 10) {
        setContactNumberError("Contact number must be exactly 10 digits");
        isValid = false;
      } else if (!/^[986]/.test(contactNumber)) {
        setContactNumberError("Contact number must start with '986'");
        isValid = false;
      }

      if (confirmPassword.trim() === "") {
        setConfirmPasswordError("Confirm Password is required");
        isValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        isValid = false;
      }

      if (role.trim() === "") {
        setRoleError("Role is required");
        isValid = false;
      }
    }

    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!email.endsWith(`@${EMAIL_DOMAIN}`)) {
      setEmailError(`Email must be from ${EMAIL_DOMAIN} domain.`);
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (currState === "Login") {
        setIsLoginSuccess(false);
      } else {
        setIsRegisterSuccess(false);
      }
      return;
    }

    const url = currState === "Login" 
      ? 'http://localhost:8081/api/auth/login' 
      : 'http://localhost:8081/api/auth/register';

    const bodyData = currState === "Login" 
      ? { email, password }
      : { username, password, email, role, contactNumber };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        const data = await response.json();
        if (currState === "Login") {
          setLoginMessage("Login successful!");
          setIsLoginSuccess(true);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('userEmail', data.email);
          setUserId(data.userId);

          // Close the popup before navigating
          setShowLogin(false);

          // Redirect based on role
          const userRole = data.role; // Assuming role is returned in the response
          if (userRole === 'CUSTOMER') {
            navigate('/');
          } else if (userRole === 'RESTAURANT_OWNER') {
            navigate('/restaurant-dashboard');
          }
        } else {
          setRegisterMessage("Registration successful!");
          setIsRegisterSuccess(true);
        }
        resetForm();
      } else {
        const errorData = await response.json();
        if (currState === "Login") {
          setLoginMessage(`Login failed: ${errorData.message || response.statusText}`);
          setIsLoginSuccess(false);
        } else {
          setRegisterMessage(`Registration failed: ${errorData.message || response.statusText}`);
          setIsRegisterSuccess(false);
        }
      }
    } catch (error) {
      if (currState === "Login") {
        setLoginMessage(`Error during login: ${error.message}`);
        setIsLoginSuccess(false);
      } else {
        setRegisterMessage(`Error during registration: ${error.message}`);
        setIsRegisterSuccess(false);
      }
    }
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
    setContactNumber("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setRoleError("");
    setContactNumberError("");
  };

  const handleStateChange = (state) => {
    setCurrState(state);
    resetForm();
    setLoginMessage("");
    setRegisterMessage("");
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img 
            onClick={() => setShowLogin(false)} 
            src={assets.cross_icon} 
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <>
              <input 
                type="text" 
                placeholder="Your username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              {usernameError && <p className="error-text">{usernameError}</p>}
              
              <input 
                type="text" 
                placeholder="Your contact number" 
                value={contactNumber} 
                onChange={(e) => setContactNumber(e.target.value)} 
              />
              {contactNumberError && <p className="error-text">{contactNumberError}</p>}
            </>
          )}
          <input 
            type="email" 
            placeholder="Your email" 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value.trim() === "") {
                setEmailError("Email is required");
              } else if (!e.target.value.endsWith(`@${EMAIL_DOMAIN}`)) {
                setEmailError(`Email must be from ${EMAIL_DOMAIN} domain.`);
              } else {
                setEmailError("");
              }
            }} 
          />
          {emailError && <p className="error-text">{emailError}</p>}
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {passwordError && <p className="error-text">{passwordError}</p>}
          {currState === "Sign Up" && (
            <>
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
              {confirmPasswordError && <p className="error-text">{confirmPasswordError}</p>}
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
              >
                <option value="">Role</option>  
                <option value="CUSTOMER">User</option>
                <option value="RESTAURANT_OWNER">Restaurant Owner</option>
              </select>
              {roleError && <p className="error-text">{roleError}</p>}
            </>
          )}
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
      
        {currState === "Login" && loginMessage && (
          <p className={isLoginSuccess ? "success-text" : "error-text"}>
            {loginMessage}
          </p>
        )}
        {currState === "Sign Up" && registerMessage && (
          <p className={isRegisterSuccess ? "success-text" : "error-text"}>
            {registerMessage}
          </p>
        )}
      
        {currState === "Login" 
          ? <p>Create a new account? <span onClick={() => handleStateChange("Sign Up")}>Click here</span></p> 
          : <p>Already have an account? <span onClick={() => handleStateChange("Login")}>Login here</span></p>}
      </form>

      {userId && <h1>User ID: {userId}</h1>}
    </div>
  );
};

export default LoginPopup;*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    contactNumber: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const EMAIL_DOMAIN = "nucleusteq.com";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ""
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (currState === "Sign Up") {
      if (!formData.username.trim()) {
        errors.username = "Username is required";
        isValid = false;
      } else if (formData.username.length < 3) {
        errors.username = "Username must be at least 3 characters";
        isValid = false;
      }

      if (!formData.contactNumber.trim()) {
        errors.contactNumber = "Contact number is mandatory";
        isValid = false;
      } else if (formData.contactNumber.length !== 10) {
        errors.contactNumber = "Contact number must be exactly 10 digits";
        isValid = false;
      } else if (!/^[986]/.test(formData.contactNumber)) {
        errors.contactNumber = "Contact number must start with '986'";
        isValid = false;
      }

      if (!formData.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm Password is required";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
        isValid = false;
      }

      if (!formData.role.trim()) {
        errors.role = "Role is required";
        isValid = false;
      }
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!formData.email.endsWith(`@${EMAIL_DOMAIN}`)) {
      errors.email = `Email must be from ${EMAIL_DOMAIN} domain.`;
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (currState === "Login") {
        setIsLoginSuccess(false);
      } else {
        setIsRegisterSuccess(false);
      }
      return;
    }

    const url = currState === "Login" 
      ? 'http://localhost:8081/api/auth/login' 
      : 'http://localhost:8081/api/auth/register';

    const bodyData = currState === "Login" 
      ? { email: formData.email, password: formData.password }
      : { 
          username: formData.username, 
          password: formData.password, 
          email: formData.email, 
          role: formData.role, 
          contactNumber: formData.contactNumber 
        };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        const data = await response.json();
        if (currState === "Login") {
          setLoginMessage("Login successful!");
          setIsLoginSuccess(true);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('userEmail', data.email);
          setUserId(data.userId);

          // Close the popup before navigating
          setShowLogin(false);

          // Redirect based on role
          const userRole = data.role; // Assuming role is returned in the response
          if (userRole === 'CUSTOMER') {
            navigate('/');
            window.location.reload();
          } else if (userRole === 'RESTAURANT_OWNER') {
            navigate('/restaurant-dashboard');
          }
        } else {
          setRegisterMessage("Registration successful!");
          setIsRegisterSuccess(true);
        }
        resetForm();
      } else {
        const errorData = await response.json();
        if (currState === "Login") {
          setLoginMessage(`Login failed: ${errorData.message || response.statusText}`);
          setIsLoginSuccess(false);
        } else {
          setRegisterMessage(`Registration failed: ${errorData.message || response.statusText}`);
          setIsRegisterSuccess(false);
        }
      }
    } catch (error) {
      if (currState === "Login") {
        setLoginMessage(`Error during login: ${error.message}`);
        setIsLoginSuccess(false);
      } else {
        setRegisterMessage(`Error during registration: ${error.message}`);
        setIsRegisterSuccess(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      contactNumber: ""
    });
    setFormErrors({});
  };

  const handleStateChange = (state) => {
    setCurrState(state);
    resetForm();
    setLoginMessage("");
    setRegisterMessage("");
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img 
            onClick={() => setShowLogin(false)} 
            src={assets.cross_icon} 
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <>
              <input 
                type="text" 
                placeholder="Your username" 
                name="username"
                value={formData.username} 
                onChange={handleInputChange} 
              />
              {formErrors.username && <p className="error-text">{formErrors.username}</p>}
              
              <input 
                type="text" 
                placeholder="Your contact number" 
                name="contactNumber"
                value={formData.contactNumber} 
                onChange={handleInputChange} 
              />
              {formErrors.contactNumber && <p className="error-text">{formErrors.contactNumber}</p>}
            </>
          )}
          <input 
            type="email" 
            placeholder="Your email" 
            name="email"
            value={formData.email} 
            onChange={handleInputChange} 
          />
          {formErrors.email && <p className="error-text">{formErrors.email}</p>}
          <input 
            type="password" 
            placeholder="Password" 
            name="password"
            value={formData.password} 
            onChange={handleInputChange} 
          />
          {formErrors.password && <p className="error-text">{formErrors.password}</p>}
          {currState === "Sign Up" && (
            <>
              <input 
                type="password" 
                placeholder="Confirm Password" 
                name="confirmPassword"
                value={formData.confirmPassword} 
                onChange={handleInputChange} 
              />
              {formErrors.confirmPassword && <p className="error-text">{formErrors.confirmPassword}</p>}
              <select 
                name="role"
                value={formData.role} 
                onChange={handleInputChange} 
              >
                <option value="">Role</option>  
                <option value="CUSTOMER">User</option>
                <option value="RESTAURANT_OWNER">Restaurant Owner</option>
              </select>
              {formErrors.role && <p className="error-text">{formErrors.role}</p>}
            </>
          )}
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
      
        {currState === "Login" && loginMessage && (
          <p className={isLoginSuccess ? "success-text" : "error-text"}>
            {loginMessage}
          </p>
        )}
        {currState === "Sign Up" && registerMessage && (
          <p className={isRegisterSuccess ? "success-text" : "error-text"}>
            {registerMessage}
          </p>
        )}
      
    {currState === "Login" 
  ? <p>Create a new account? <span onClick={() => handleStateChange("Sign Up")}>Click here</span></p> 
  : <p>Already have an account? <span onClick={() => handleStateChange("Login")}>Login here</span></p>}
</form>

{userId && <h1>User ID: {userId}</h1>}
</div>
);
};

export default LoginPopup;

