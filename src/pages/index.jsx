import React, { useState } from 'react';
import NavbarBeforeLogin from '../components/NavbarBeforeLogin';
import NavbarAfterLogin from '../components/NavbarBeforeLogin';
import HomeWithLogin from '../components/HomeWithLogin';
import HomeWithOutLogin from '../components/HomeWithOutLogin';

export default function Home() {
  const [showAfterLogin, setShowBeforeLogin] = useState(true);

  return (
    <div>
      {showAfterLogin ? <NavbarBeforeLogin/> : <NavbarAfterLogin />}
      {showAfterLogin ? <HomeWithOutLogin /> : <HomeWithLogin />}
    </div>
  );
}