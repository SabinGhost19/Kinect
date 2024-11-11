import React, { useState } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  setAccesTokenInLocalStorare,
  setRefreshTokenInLocalStorare,
} from '../utils/localStorageUtils';

const LogIn: React.FC = () => {
  const url = 'http://localhost:3000/auth/login';
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${url}`, {
        email: formData.email,
        password: formData.password,
      });
      console.log('Response :', response);

      if (response.status === 201 || response.status === 200) {
        const { accessToken, refreshToken } = response.data;

        console.log('Access Token primit:', accessToken);
        console.log('and refreshToken', refreshToken);

        setAccesTokenInLocalStorare(accessToken);
        setRefreshTokenInLocalStorare(refreshToken);
        navigate('/home');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />
      <button
        onClick={handleLogin}
        className="p-2 text-gray-900 hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
      >
        LogIn
      </button>
    </div>
  );
};

export default LogIn;
