import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { ConfigProvider } from 'antd';



function Layouts({ children }: { children: React.ReactNode }) {
  const [searchType, setSearchType] = useState<'shebei' | 'ershou'| 'peijian'>('shebei')
  return (
    <>
    <Header searchType={searchType} onChange={setSearchType}/>
      {children}
      <Footer />
    </>
  );
}

export default Layouts;
