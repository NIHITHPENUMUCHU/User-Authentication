import React, { useState } from 'react';
import { AuthButtons } from './components/AuthButtons';
import { AuthModal } from './components/AuthModal';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';
import { SuccessPage } from './components/SuccessPage.tsx';

interface User {
  name: string;
  email: string;
  password: string;
}

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (email: string, password: string) => {
    const user = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      setLoginError('');
      setIsLoginOpen(false);
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    const newUser = { name, email, password };
    setRegisteredUsers([...registeredUsers, newUser]);
    setCurrentUser(newUser);
    setIsSignUpOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (currentUser) {
    return <SuccessPage user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Beyond Career</h1>
            <AuthButtons
              onLoginClick={() => setIsLoginOpen(true)}
              onSignUpClick={() => setIsSignUpOpen(true)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">User Autentication Page</h2>
          <p className="mt-4 text-lg text-gray-600">
            Please login or sign up to get started.
          </p>
        </div>
      </main>

      <AuthModal
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
          setLoginError('');
        }}
        title="Login"
      >
        <LoginForm onSubmit={handleLogin} error={loginError} />
      </AuthModal>

      <AuthModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        title="Sign Up"
      >
        <SignUpForm onSubmit={handleSignUp} />
      </AuthModal>
    </div>
  );
}

export default App;