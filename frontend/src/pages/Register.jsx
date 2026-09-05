import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import '../styles/auth.css';

const Register = () => {
  return (
    <div className="auth-container">
      <SignUp routing="path" path="/register" signInUrl="/login" />
    </div>
  );
};

export default Register;
