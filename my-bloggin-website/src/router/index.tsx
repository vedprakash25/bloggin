import Navbar from '../organisms/navbar';
import BlogListingPage from '../pages/about';
import { Outlet } from 'react-router-dom';
import Footer from '../organisms/footer';
import {
  ErrorPage,
  HomePage,
  LoginPage,
  SignupPage,
  UserAccountPage,
} from '../pages';
import { ProtectedRoutesOrganisms } from '../organisms';

const ShowNavAndFooter = () => {
  return (
    <section>
      <Navbar />
      <div className="min-h-[20rem] border">
        <Outlet />
      </div>
      <Footer />
    </section>
  );
};

export function Routes() {
  return [
    {
      path: '/',
      element: <ShowNavAndFooter />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/blog-listing',
          element: <BlogListingPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/signup',
          element: <SignupPage />,
        },
        {
          path: '/user',
          element: (
            <ProtectedRoutesOrganisms>
              <UserAccountPage />
            </ProtectedRoutesOrganisms>
          ),
        },
        // {
        //   path: '/contact',
        //   element: <ContactPage />,
        // },
        // {
        //   path: '/about',
        //   element: <AboutPage />,
        // },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ];
}
