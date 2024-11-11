import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const url = 'http://localhost:3000/auth/register';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    socialLinks: '',
    profileImage: '',
    description: '',
  });
  const onSubmit = async () => {
    try {
      console.log('AAAAA');
      const response = await axios.post(`${url}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        profileImage: formData.profileImage,
        description: formData.description,
        socialLinks: [
          {
            platform: 'LinkedIn',
            url: 'http://linkedin.com/in/someprofile',
          },
          {
            platform: 'Twitter',
            url: 'http://twitter.com/someprofile',
          },
        ],
      });

      if (response.status === 201) {
        console.log('Acesta este userul:', response.data.user);
        navigate('/login');
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <>
      <h1>REGISTER PAGE</h1>
      <Input
        label="FirstName"
        type="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Enter your FirstName"
      />
      <Input
        label="LastName"
        type="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Enter your LastName"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your Password"
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <Input
        label="SocialLinks"
        type="socialLinks"
        name="socialLinks"
        value={formData.socialLinks}
        onChange={handleChange}
        placeholder="Enter your SocialLinks"
      />
      <Input
        label="Description"
        type="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter your Description"
      />
      <button onClick={onSubmit}>SUBMIT</button>
    </>
  );
};

export default Register;
