import { motion } from "framer-motion";
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <motion.div 
      className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-full max-w-lg"
      whileHover={{ scale: 1.02 }} // aumenta 2% no hover
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Search className="text-gray-500 w-5 h-5" />
      <input
        type="text"
        placeholder="O que você procura?"
        className="bg-transparent w-full outline-none placeholder:text-gray-400"
      />
      <motion.button 
        whileTap={{ scale: 0.9 }} // encolhe no click
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
      >
        <Search className="w-4 h-4 cursor-pointer" />
      </motion.button>
    </motion.div>
  )
}
