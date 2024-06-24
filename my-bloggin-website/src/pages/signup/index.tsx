import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { object, string } from 'zod';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const schema = object({
    name: string().min(3, 'Name must be at least 3 characters'),
    email: string().email('Invalid email address'),
    password: string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: string()
      .min(8, 'Confirm password must be at least 8 characters')
      .refine(val => val === password, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      }),
  });

  const validateData = async () => {
    try {
      await schema.parseAsync({ email, password, name, confirmPassword });
      setErrors({});
      return true;
    } catch (err: any) {
      const fieldErrors: any = {};
      err.errors.forEach((error: any) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const isValid = await validateData();
    console.log(isValid);
    if (isValid) {
      const formData = {
        username: name,
        email: email,
        password: password,
      };
      try {
        const response = await axios.post(
          'http://localhost:8000/signup',
          formData
        );
        console.log(response.data);
      } catch (error: any) {
        console.error(error.response.data);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-32">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-[10px]">{errors.name}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-[10px]">{errors.email}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-[10px]">{errors.password}</p>
            )}
          </div>
          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-[10px]">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          {/* Sign Up Button */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm"> Already have an account? </span>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Login
              </Link>
            </div>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-md"
            >
              {loading ? '...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
