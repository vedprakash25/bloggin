import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="font-sans ">
        {/* Intro Section */}
        <section
          className="bg-cover bg-center h-fit py-32"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1563026915-32eba3e315de?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="container mx-auto px-4 py-16 flex flex-col items-start justify-center text-center">
            <h1 className="text-6xl font-bold text-white"> Blog Title</h1>
            <p className="text-xl text-white mt-4">
              A Short Description of Your Blog
            </p>
            <Link
              to="/"
              className="bg-white text-black px-8 py-2 mt-8 rounded-sm"
            >
              Start Your Adventure
            </Link>
          </div>
        </section>

        {/* Blog Listing Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-4">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Replace with actual blog post data */}
            <BlogPost
              title="Title of Your First Post"
              image="path/to/post-thumbnail1.jpg"
              description="A short description of your first blog post."
            />
            <BlogPost
              title="Title of Your Second Post"
              image="path/to/post-thumbnail2.jpg"
              description="A short description of your second blog post."
            />
            <BlogPost
              title="Title of Your Third Post"
              image="path/to/post-thumbnail3.jpg"
              description="A short description of your third blog post."
            />
          </div>
        </section>
      </div>
    </>
  );
}

function BlogPost({
  title,
  image,
  description,
}: {
  title: string;
  image: string;
  description: string;
}) {
  return (
    <div className="rounded shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="px-4 py-2">
        <h3 className="text-xl font-bold text-gray-700">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <a href="#" className="text-blue-500 hover:text-blue-700 mt-4">
          Read More
        </a>
      </div>
    </div>
  );
}
