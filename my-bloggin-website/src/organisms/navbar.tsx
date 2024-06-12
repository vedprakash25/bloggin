import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="container mx-auto flex justify-between gap-10 p-2">
      <div className="flex text-black font-semibold gap-10">
        <Link className="text-xl" to="/">
          Home
        </Link>
        <Link className="text-xl" to="/about">
          About
        </Link>
        <Link className="text-xl" to="/contact">
          Contact
        </Link>
      </div>
      <div className="flex text-black font-semibold gap-10">
        <Link className="text-xl" to="/login">
          Login
        </Link>
        <Link className="text-xl" to="/login">
          Logout
        </Link>
        <Link className="text-xl" to="/user">
          Account
        </Link>
      </div>
    </div>
  );
}
