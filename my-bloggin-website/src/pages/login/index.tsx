import { useState } from 'react';
import z from 'zod';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Component() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email('Please enter a valid email!'),
    password: z
      .string()
      .min(8, 'Password must contain 8 characters!')
      .max(8, 'only 8 character allowed'),
  });

  const validateData = async () => {
    try {
      await schema.parseAsync({ email, password });
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const isValid = await validateData();
    if (isValid) {
      try {
        const formData = {
          email,
          password,
        };
        const response = await axios.post(
          'http://localhost:8000/login',
          formData
        );
        if (response.status === 200) {
          navigate('/user');
        }
      } catch (err: any) {
        console.log('asd');
        setErrors(err.formErrors?.fieldErrors);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center py-32">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="w-full py-2 px-3 border"
              value={email}
              onChange={e => setEmail(e.target.value)}
              // onChange={e => setEmail('tasty@mail.com')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
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
              className="w-full py-2 px-3 border"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              className="border-2 border-white text-white px-4 py-1 w-auto"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
