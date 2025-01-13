import React, { useState, useEffect } from 'react';
import { Monitor, X } from 'lucide-react';
import Lottie from 'lottie-react';
import mobileNotice from '../../assets/AnimationMobileNotice.json'

const DesktopNotice = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 900);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    if (!isMobile) {
        return null;
    }

    return (
        <div className="fixed inset-0 h-full bg-white z-[9999]">
            <div className="h-full px-4 flex flex-col items-center my-[20%] gap-6">
                <div className='w-[20rem]'>
                    <Lottie
                        animationData={mobileNotice}
                        loop
                        autoPlay
                    />
                </div>
                <div className="flex items-center mx-[4rem] gap-2">
                    <Monitor className="h-10 w-10 text-red-500 " />
                    <p className="ml-3 text-lg font-semibold ">
                        This application is optimized for desktop use. Please switch to a larger screen.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DesktopNotice;