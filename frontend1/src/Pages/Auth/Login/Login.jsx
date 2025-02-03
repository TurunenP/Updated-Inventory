// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
// import Bhome from '../../../Components/BHOME/Bhome';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize the navigate function

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/users/login',
//         { email, password }
//       );
//       console.log(response)

//       // Save the token to local storage for authentication
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data));

//       // Get the role from the response data
//       const { role } = response.data;

//       // Redirect based on role
// if (role === 'admin') {
//   navigate('/Staff'); // Redirect to the admin dashboard
// } else {
//   navigate('/Student'); // Redirect to the user dashboard
// }

//       console.log('Login successful:', response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="h-screen w-screen">
//       <Bhome />
//       <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-300 to-blue-800">
//         <div className="bg-white p-8 rounded shadow-lg text-black w-full max-w-sm">
//           <h2 className="text-center text-2xl font-semibold">Login</h2>
//           {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
//           <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//             <input
//               type="email"
//               className="w-full p-3 border border-gray-300 rounded"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               className="w-full p-3 border border-gray-300 rounded"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-3 rounded"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from 'react';
import { useAuth } from '../../../AuthContext/AuthContext'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
 
      if (user.role === 'admin') {
        navigate('/Staff'); // Redirect to the admin dashboard
      } else {
        navigate('/Student'); // Redirect to the user dashboard
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 mb-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 mb-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
