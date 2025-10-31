// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function TemplateCard({ id, title, preview, type, index }) {
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   return (
//     <motion.div
//       key={id}
//       className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 cursor-pointer hover:-translate-y-1"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.3 }}
//       variants={fadeInUp}
//       transition={{ delay: index * 0.15 }}
//     >
//       {/* Image */}
//       <div className="relative">
//         <img
//           src={preview}
//           alt={title}
//           className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
//           <Link
//             href={`/templates/${type}?id=${id}`}
//             className="mb-4 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
//           >
//             Use This Template
//           </Link>
//         </div>
//       </div>

//       {/* Text */}
//       <div className="p-4 text-center">
//         <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
//       </div>
//     </motion.div>
//   );
// }
