"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SignInWithGoogle from "../../components/SignInWithGoogle";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";

export default function SignIn() {
  // Animation timing
  const leftPanelDuration = 0.7;
  const leftPanelDelay = 0.2;
  const titleDelay = leftPanelDelay + leftPanelDuration + 0.1;
  const taglineDelay = titleDelay + 0.2;
  const logoDelay = titleDelay + 0.2; // Logo starts earlier, overlapping more with the title
  const signInDelay = logoDelay + 0.9; // Allow for longer logo animation

  // Modal state for create account
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    setRegisterLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      setRegisterSuccess("Account created! You can now sign in.");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (err: any) {
      setRegisterError(err.message);
    }
    setRegisterLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Blue Panel Animation */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 h-full bg-blue-500 text-white z-10"
        initial={{ width: 0 }}
        animate={{ width: "50vw" }}
        transition={{ duration: leftPanelDuration, delay: leftPanelDelay, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center justify-center h-full px-8">
          <motion.h1
            className="text-7xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: titleDelay, duration: 0.5 }}
          >
            thinkcompl<span className="text-blue-200">.ai</span>
          </motion.h1>
          <motion.p
            className="text-4xl font-semibold text-blue-100 text-center mb-16 whitespace-nowrap drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: taglineDelay, duration: 0.5 }}
          >
            Built to think. Designed to comply
          </motion.p>
          <motion.div
            className="mt-16 flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: titleDelay, duration: 0.5 }}
          >
            {/* Animated SVG Globe with Tick */}
            <svg
              viewBox="0 0 595.28 841.89"
              width={240}
              height={240}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Globe reveal mask using a stroked path */}
                <mask id="globe-reveal-mask">
                  <motion.path
                    d="M266.44,12.89c12.05-1.51,26.46-.73,38.32-.53,4.78.18,9.52.64,14.16,1.45l.16.03c20.15,4.53,41.74,5.1,60.83,14.7,9.17,4.21,18.07,12.66,13.73,23.48-4.29,11.02-15.96,11.74-26.3,8.84C180.83,4.42.53,166.61,52.54,360.35c10.39,42,36.01,76.96,62.23,107.66,24.4,28.58,50.62,63.2,63.19,100.79,4.48,12.76,7.8,25.87,10.52,39.12,1,4.88,2,11.02,3.47,15.25,1.34,3.68,3.55,3.73,8.25,3.58,2.03-.03,3.97.01,6.06,0,42.8-.15,156.47-.09,196.51-.2,3.51.21,6.06-.5,7.62-3.6,1.88-3.65,3.36-9.54,4.3-14.28,6.8-39.22,21.83-76.51,45.54-108.07,5.11-6.72,9.43-13.73,16.89-17.39,8.98-4.75,21.95-.54,24.18,9.97,2.96,13.34-9.78,23.46-16.18,33.83-20.58,31.03-32.76,66.84-38.13,104.02-2.77,21.66-13.3,30.56-35.36,31.09-74.47,1.25-149.5,1.58-224.07-.14-6.16-.88-12.02-2.74-16.73-6-9.88-6.81-13.76-19.05-16.6-30.21-5.01-21.69-9.41-45.39-20.3-65.74-19.51-39.18-50.94-66.53-75.63-101.93C-59.93,292.78,38.83,47,238.37,17.54"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={90}
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: titleDelay + 0.2, duration: 1.05, ease: "easeInOut" }}
                  />
                </mask>
                {/* First base line mask */}
                <mask id="base1-mask">
                  <motion.rect
                    x="0" y="0"
                    width="595.28"
                    height="841.89"
                    fill="#fff"
                    initial={{ width: 0 }}
                    animate={{ width: 595.28 }}
                    transition={{ delay: titleDelay + 0.4, duration: 0.9, ease: "easeInOut" }}
                  />
                </mask>
                {/* Second base line mask (overlaps first) */}
                <mask id="base2-mask">
                  <motion.rect
                    x="0" y="0"
                    width="595.28"
                    height="841.89"
                    fill="#fff"
                    initial={{ width: 0 }}
                    animate={{ width: 595.28 }}
                    transition={{ delay: titleDelay + 0.6, duration: 0.9, ease: "easeInOut" }}
                  />
                </mask>
                {/* Tick mask (overlaps second base line, finishes last) */}
                <mask id="tick-mask">
                  <motion.rect
                    x="0" y="0"
                    width="595.28"
                    height="841.89"
                    fill="#fff"
                    initial={{ width: 0 }}
                    animate={{ width: 595.28 }}
                    transition={{ delay: titleDelay + 0.7, duration: 1.05, ease: "easeInOut" }}
                  />
                </mask>
              </defs>
              {/* Main globe outline (filled, revealed by mask) */}
              <g mask="url(#globe-reveal-mask)">
                <path fill="#fff" d="M266.44,12.89c12.05-1.51,26.46-.73,38.32-.53,4.78.18,9.52.64,14.16,1.45l.16.03c20.15,4.53,41.74,5.1,60.83,14.7,9.17,4.21,18.07,12.66,13.73,23.48-4.29,11.02-15.96,11.74-26.3,8.84C180.83,4.42.53,166.61,52.54,360.35c10.39,42,36.01,76.96,62.23,107.66,24.4,28.58,50.62,63.2,63.19,100.79,4.48,12.76,7.8,25.87,10.52,39.12,1,4.88,2,11.02,3.47,15.25,1.34,3.68,3.55,3.73,8.25,3.58,2.03-.03,3.97.01,6.06,0,42.8-.15,156.47-.09,196.51-.2,3.51.21,6.06-.5,7.62-3.6,1.88-3.65,3.36-9.54,4.3-14.28,6.8-39.22,21.83-76.51,45.54-108.07,5.11-6.72,9.43-13.73,16.89-17.39,8.98-4.75,21.95-.54,24.18,9.97,2.96,13.34-9.78,23.46-16.18,33.83-20.58,31.03-32.76,66.84-38.13,104.02-2.77,21.66-13.3,30.56-35.36,31.09-74.47,1.25-149.5,1.58-224.07-.14-6.16-.88-12.02-2.74-16.73-6-9.88-6.81-13.76-19.05-16.6-30.21-5.01-21.69-9.41-45.39-20.3-65.74-19.51-39.18-50.94-66.53-75.63-101.93C-59.93,292.78,38.83,47,238.37,17.54"/>
              </g>
              {/* Main globe outline (animated, top-down) */}
              <motion.path
                d="M266.44,12.89c12.05-1.51,26.46-.73,38.32-.53,4.78.18,9.52.64,14.16,1.45l.16.03c20.15,4.53,41.74,5.1,60.83,14.7,9.17,4.21,18.07,12.66,13.73,23.48-4.29,11.02-15.96,11.74-26.3,8.84C180.83,4.42.53,166.61,52.54,360.35c10.39,42,36.01,76.96,62.23,107.66,24.4,28.58,50.62,63.2,63.19,100.79,4.48,12.76,7.8,25.87,10.52,39.12,1,4.88,2,11.02,3.47,15.25,1.34,3.68,3.55,3.73,8.25,3.58,2.03-.03,3.97.01,6.06,0,42.8-.15,156.47-.09,196.51-.2,3.51.21,6.06-.5,7.62-3.6,1.88-3.65,3.36-9.54,4.3-14.28,6.8-39.22,21.83-76.51,45.54-108.07,5.11-6.72,9.43-13.73,16.89-17.39,8.98-4.75,21.95-.54,24.18,9.97,2.96,13.34-9.78,23.46-16.18,33.83-20.58,31.03-32.76,66.84-38.13,104.02-2.77,21.66-13.3,30.56-35.36,31.09-74.47,1.25-149.5,1.58-224.07-.14-6.16-.88-12.02-2.74-16.73-6-9.88-6.81-13.76-19.05-16.6-30.21-5.01-21.69-9.41-45.39-20.3-65.74-19.51-39.18-50.94-66.53-75.63-101.93C-59.93,292.78,38.83,47,238.37,17.54"
                fill="#fff"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: titleDelay + 0.9, duration: 0.2 }}
              />
              {/* First base line (animated) */}
              <g mask="url(#base1-mask)">
                <path fill="#fff" d="M417.71,699.19c.3.54,1.82,11.2,1.74,12.36-.56,10.18-12.69,15.12-21.3,15.9-61.54,5.59-131.17-4.31-193.56-.06-24.92-2.85-26.71-33.56-5.94-36.08h203.92c2.85-.42,14.34,6.43,15.14,7.87v.02Z"/>
              </g>
              {/* Second base line (animated) */}
              <g mask="url(#base2-mask)">
                <path fill="#fff" d="M371.41,759.03c20.3,3.79,18.78,33.51-1.34,35.97l-141.74-.14c-17.98-4.21-20.08-30.56-1.23-35.59l144.31-.24Z"/>
              </g>
              {/* Tick (animated) */}
              <g mask="url(#tick-mask)">
                <path
                  d="M271.71,390.42c.27-.17,1.86-3.96,3.22-5.47,82.69-91.62,170.49-178.38,252.65-270.69,26.87-20.9,60.5,8.9,45.88,41.3-95.79,107.23-193.95,213.5-293.61,316.47-9.13,4.07-19.04,1.49-26.84-4.41l-123.64-133.33c-21.12-31.17,13.68-65.69,42.36-45.7l93.31,100.58c1.71,1.5,4.73,2.46,6.65,1.25h.01Z"
                  fill="#c2daf1"
                />
              </g>
            </svg>
          </motion.div>
        </div>
      </motion.div>
      {/* Main Content (Right Panel) */}
      <motion.div
        className="flex min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: signInDelay, duration: 0.6 }}
      >
        {/* Spacer for left panel on desktop */}
        <div className="hidden md:block w-1/2" />
        {/* Right Panel */}
        <section className="flex flex-1 flex-col justify-center items-center bg-gray-50">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Sign In</h2>
            <p className="text-center text-gray-700 mb-6">Enter your details to access your account</p>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@company.com"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  autoComplete="current-password"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-900">
                  <input type="checkbox" className="mr-2 rounded" /> Remember me
                </label>
                <Link href="#" className="text-blue-600 hover:underline text-sm">Forgot password?</Link>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors"
              >
                Sign In
              </button>
            </form>
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            <div className="flex justify-center mb-2">
              <SignInWithGoogle />
            </div>
            <div className="text-center mt-4 text-sm text-gray-900">
              Don't have an account?{' '}
              <button
                className="text-blue-600 hover:underline focus:outline-none"
                onClick={() => setShowCreateAccount(true)}
                type="button"
              >
                Create Account
              </button>
            </div>
          </div>
          {/* Create Account Modal (with registration form) */}
          {showCreateAccount && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              {/* Blur background */}
              <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative z-10 border border-blue-100"
              >
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
                  onClick={() => setShowCreateAccount(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                {/* Modal Title */}
                <h1 className="text-3xl font-bold text-center mb-2 text-blue-600">thinkcompl<span className="text-blue-300">.ai</span></h1>
                <p className="text-center text-gray-600 mb-2">Create your account below using your email and a secure password.</p>
                <h3 className="text-2xl font-bold mb-4 text-center">Create Account</h3>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-900">Email</label>
                    <input
                      id="register-email"
                      type="email"
                      value={registerEmail}
                      onChange={e => setRegisterEmail(e.target.value)}
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-900">Password</label>
                    <input
                      id="register-password"
                      type="password"
                      value={registerPassword}
                      onChange={e => setRegisterPassword(e.target.value)}
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  {registerError && <div className="text-red-500 text-sm">{registerError}</div>}
                  {registerSuccess && <div className="text-green-600 text-sm">{registerSuccess}</div>}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors"
                    disabled={registerLoading}
                  >
                    {registerLoading ? "Creating..." : "Create Account"}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
          <footer className="mt-8 text-xs text-gray-400 text-center space-y-1">
            <div>© 2025 compl.ai. All rights reserved.</div>
            <div>
              <Link href="#" className="hover:underline">Terms of Service</Link> |{' '}
              <Link href="#" className="hover:underline">Privacy Policy</Link> |{' '}
              <Link href="#" className="hover:underline">Support</Link>
            </div>
          </footer>
        </section>
      </motion.div>
    </div>
  );
} 