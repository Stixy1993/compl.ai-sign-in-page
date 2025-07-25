"use client";
import { motion } from "framer-motion";

export default function CalibrationLicensesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen"
    >
      <div className="px-4 pt-2 pb-2">
        <h1 className="text-2xl font-bold text-white">Calibration & Licenses</h1>
      </div>
      <main className="flex-1 flex flex-col gap-8 items-center justify-start w-full px-4 py-8">
        <section className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 mb-4">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Equipment Calibration</h2>
          <p className="text-gray-700 mb-4">A stylish table or card layout for equipment calibration will go here.</p>
          <div className="h-32 flex items-center justify-center text-gray-400 italic">Equipment calibration table coming soon...</div>
        </section>
        <section className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Personnel Licenses</h2>
          <p className="text-gray-700 mb-4">Admins will be able to view and manage personnel profiles, qualifications, and receive expiry notifications.</p>
          <div className="h-32 flex items-center justify-center text-gray-400 italic">Personnel licenses section coming soon...</div>
        </section>
      </main>
    </motion.div>
  );
} 