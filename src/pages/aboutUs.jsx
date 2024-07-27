import React from 'react';
import NavbarAfterLogin from '../components/NavbarAfterLogin';
import NavbarBeforeLogin from '../components/NavbarBeforeLogin';
import AboutUs from '../components/AboutUsContent';
import { useState } from 'react';

export default function aboutUs(){
    const [showAfterLogin, setShowBeforeLogin] = useState(true);

    return (
        <div>
            {showAfterLogin ? <NavbarBeforeLogin/> : <NavbarAfterLogin />}
            <AboutUs />
        </div>
    );
}