// "use client";

// import { useEffect } from "react";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";
// import { motion } from "framer-motion";
// import TemplateCard from "@/components/TemplateCard";

// const allTemplates = [
//   { id: 1, title: "Creative Designer", preview: "https://via.placeholder.com/300x200?text=Creative+1", type: "creative" },
//   { id: 2, title: "Corporate Resume", preview: "https://via.placeholder.com/300x200?text=Professional+1", type: "professional" },
//   { id: 3, title: "Simple Classic", preview: "https://via.placeholder.com/300x200?text=Simple+1", type: "simple" },
//   { id: 4, title: "Modern Executive", preview: "https://via.placeholder.com/300x200?text=Professional+2", type: "professional" },
// ];

// export default function AllTemplates() {
//   useEffect(() => window.scrollTo(0, 0), []);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <motion.main
//         className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         <h1 className="text-3xl font-bold mb-6 text-center">All Templates</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {allTemplates.map((template, index) => (
//             <TemplateCard key={template.id} {...template} index={index} type={template.type} />
//           ))}
//         </div>
//       </motion.main>
//       <Footer />
//     </div>
//   );
// }
