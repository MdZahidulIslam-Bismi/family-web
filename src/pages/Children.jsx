// import { useEffect, useState } from "react";
// import axios from "axios";

// function ChildrenList() {
//   const [children, setChildren] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/children")
//       .then((res) => {
//         setChildren(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching children:", err);
//       });
//   }, []);

//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-2">Children List</h2>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-3 py-2">First Name</th>
//             <th className="border px-3 py-2">Last Name</th>
//             <th className="border px-3 py-2">Parent Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {children.map((child) => (
//             <tr key={child.id}>
//               <td className="border px-3 py-2">{child.firstName}</td>
//               <td className="border px-3 py-2">{child.lastName}</td>
//               <td className="border px-3 py-2">
//                 {child.parentsName || "N/A"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ChildrenList;


import React from 'react'

const Children = () => {
  return (
    <div>Children</div>
  )
}

export default Children