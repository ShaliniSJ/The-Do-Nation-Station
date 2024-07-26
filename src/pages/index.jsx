import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HomeWithLogin from '../components/HomeWithLogin';
import HomeWithOutLogin from '../components/HomeWithOutLogin';

export default function Home() {
  const [showAfterLogin, setShowBeforeLogin] = useState(true);

  return (
    <div>
      <Navbar />
      {showAfterLogin ? <HomeWithOutLogin /> : <HomeWithLogin />}
    </div>
  );
}