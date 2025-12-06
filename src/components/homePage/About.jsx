import React from 'react';
import { FaGlobe, FaCogs, FaShieldAlt, FaChartLine } from 'react-icons/fa';

const About = () => {
    return (
        <section className="py-16 md:py-24 bg-base-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-main)]">About Asset Sync</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {/* Feature 1 */}
                    <div className="flex flex-col items-center group">
                        <div className="mb-6 p-4 rounded-full bg-base-200 group-hover:bg-base-300 transition-colors duration-300">
                            <FaGlobe className="text-4xl text-teal-500" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-3">Unified Asset Visibility</h3>
                        <p className="text-sm text-[var(--color-text-sub)] leading-relaxed max-w-xs mx-auto">
                            Gain a complete, real-time view of all company assets across locations and departments.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col items-center group">
                        <div className="mb-6 p-4 rounded-full bg-base-200 group-hover:bg-base-300 transition-colors duration-300">
                            <FaCogs className="text-4xl text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-3">Optimized Lifecycle Management</h3>
                        <p className="text-sm text-[var(--color-text-sub)] leading-relaxed max-w-xs mx-auto">
                            Proactively manage asset procurement, maintenance, and retirement to maximize value.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col items-center group">
                        <div className="mb-6 p-4 rounded-full bg-base-200 group-hover:bg-base-300 transition-colors duration-300">
                            <FaShieldAlt className="text-4xl text-teal-500" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-3">Enhanced Compliance & Audit Readiness</h3>
                        <p className="text-sm text-[var(--color-text-sub)] leading-relaxed max-w-xs mx-auto">
                            Simplify audits with detailed tracking, reporting, and automated compliance tools.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex flex-col items-center group">
                        <div className="mb-6 p-4 rounded-full bg-base-200 group-hover:bg-base-300 transition-colors duration-300">
                            <FaChartLine className="text-4xl text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-3">Cost Reduction & Efficiency</h3>
                        <p className="text-sm text-[var(--color-text-sub)] leading-relaxed max-w-xs mx-auto">
                            Minimize waste, reduce redundancy, and improve asset utilization with intelligent insights.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
