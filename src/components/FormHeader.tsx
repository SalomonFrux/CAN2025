
import { motion } from "framer-motion";

const FormHeader = () => {
  return (
    <div className="mb-12 text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-32 h-32 mx-auto mb-6"
      >
        <div className="w-full h-full bg-can-logo bg-no-repeat bg-contain bg-center" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold text-morocco-black mb-3"
      >
        FORMULAIRE D'INSCRIPTION CAN 2025 MAROC
      </motion.h1>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="flex justify-center"
      >
        <span className="block px-4 py-2 bg-morocco-gold/10 text-morocco-black rounded-lg text-sm md:text-base font-medium">
          " Destination CAN 2025 – On s'occupe de tout, vous vibrez ! "
        </span>
      </motion.div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="mt-6 relative h-1 max-w-md mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-morocco-red via-morocco-gold to-morocco-green opacity-60 rounded-full" />
      </motion.div>
    </div>
  );
};

export default FormHeader;
