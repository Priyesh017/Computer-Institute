import { motion } from "framer-motion";

export default function Register() {
  return (
    <motion.h2
      className="text-5xl font-bold fade-in mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Register
    </motion.h2>
  );
}
