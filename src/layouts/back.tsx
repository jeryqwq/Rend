import React, { useState } from 'react';
import Footer from './Footer';
import Header from './BackHeader';



function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <div>
    <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layouts;
