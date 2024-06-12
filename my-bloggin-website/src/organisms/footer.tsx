import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer className=" text-black text-center py-4">
        Copyright &copy; {new Date().getFullYear()} Blogginwebsite
      </footer>
    </div>
  );
}
