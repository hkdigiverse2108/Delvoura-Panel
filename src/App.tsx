// import { RouterProvider } from "react-router-dom";
// import { useEffect } from "react";
// import { useAppDispatch } from "./Store/hooks";
// import { getMe } from "./Api/UserApi";
// import { setUser, setLogout } from "./Store/Slices/AuthSlice";
// import { Router } from "./Routers";

// function App() {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       // 🔹 backend se user info fetch karo
//       getMe()
//         .then((res) => {
//           dispatch(setUser(res.data));
//         })
//         .catch(() => {
//           dispatch(setLogout());
//         });
//     }
//   }, [dispatch]);

//   return <RouterProvider router={Router} />;
// };

// export default App;


import { RouterProvider } from "react-router-dom";
import { Router } from "./Routers";

function App() {
  return <RouterProvider router={Router} />;
}

export default App;