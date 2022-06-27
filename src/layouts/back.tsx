import React, { useState } from 'react';
import Footer from './Footer';
import Header from './BackHeader';



function Layouts({ children }: { children: React.ReactNode }) {
  console.log(children)
  return (
    <div>
    <Header />
      {children}
      <Footer layout/>
    </div>
  );
}

export default Layouts;
