import React, { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="container my-4">
          {children}
        </main>
        <Footer />
      </div>
  );
};

export default Layout;
