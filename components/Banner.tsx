import { motion } from "framer-motion";

export default function SchoolLandingPage() {
  return (
    <div className="relative -top-20 min-h-screen w-[100%] flex flex-col items-center justify-center text-white">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold text-center drop-shadow-lg"
      >
        Welcome to Bright Future Academy
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="mt-4 text-lg text-center max-w-2xl"
      >
        The perfect place for your child’s growth and success. Enroll now to
        secure a brighter future!
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "backOut" }}
        className="mt-6"
      >
        <button className="px-6 py-3 bg-white text-violet-700 font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl focus:outline-none">
          Enroll Now
        </button>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-4">
        {[
          {
            title: "Modern Facilities",
            desc: "State-of-the-art classrooms and labs.",
          },
          {
            title: "Expert Teachers",
            desc: "Highly qualified and experienced faculty.",
          },
          {
            title: "Holistic Learning",
            desc: "Focus on academics, sports, and arts.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.6, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 transition-transform transform hover:scale-105 hover:bg-white/20 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold hover:text-yellow-300 transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-sm mt-2 hover:text-yellow-200 transition-colors duration-300">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
