import React from 'react';
import { Link } from 'react-router';
import banner from '../../assets/banner/banner-new.png';
import { FaGlobe, FaCogs, FaShieldAlt, FaChartLine } from 'react-icons/fa';

const Banner = () => {
    return (
        <section className="relative w-full overflow-hidden mb-12">
            {/* Hero Section */}
            <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">

                {/* Background Images */}
                <div className="absolute inset-0 z-0">
                    {/* Light Mode Image (Used for both modes now) */}
                    <img
                        src={banner}
                        alt="Asset Management"
                        className="w-full h-full object-cover object-center block"
                    />

                    {/* Overlays */}
                    {/* Light Mode Overlay: White fade for text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent dark:hidden"></div>
                    {/* Dark Mode Overlay: Dark Blue/Teal fade matching the dark theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015]/90 via-[#0f1015]/40 to-transparent hidden dark:block"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    {/* Light Mode Title */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-[var(--color-text-main)] block ">
                        Manage Assets <br />with Ease
                    </h1>

                    <p className="text-[var(--color-text-sub)] text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                        AssetVerse provides a seamless and intuitive platform for both employees
                        and HR managers to handle company assets with efficiency and transparency.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/signup?role=employee">
                            <button className="btn btn-gradient text-white px-8 py-3 rounded-md font-medium border-0 hover:opacity-90 text-sm">
                                Join as Employee
                            </button>
                        </Link>
                        <Link to="/signup?role=hr_manager">
                            <button className="btn btn-gradient btn-outline text-white  font-medium  hover:opacity-90 text-sm">
                                Join as HR Manager
                            </button>
                        </Link>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default Banner;
