import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API from '../../API/Api';
const ItemList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await API.get('/api/items/');
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };
    fetchItems();
  }, []);

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-6 pr-4 md:p-6 bg-gray-100 min-h-screen flex flex-col items-center ">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Equipments</h2>

      {/* Search Bar */}
      <div className="mb-6 w-full max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or category..."
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[90%] mx-auto -ml-4 md:ml-0">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border-t-2 border-blue-300 border-l-2 rounded-xl w-full shadow-lg py-2 flex flex-col items-center mx-6"
            >
              <div className="flex items-center justify-between px-5 gap-18 pb-1 border-b w-full">
                <p className="font-semibold"> {item.lab} </p>
                <p className="font-semibold"> {item.location} </p>
              </div>

              <div className="mt-10 w-full px-4 ">
                <h2 className="mb-2 font-semibold text-3xl"> {item.name} </h2>
                <h2 className="mb-2 font-bold text-blue-400">
                  {' '}
                  {item.section}{' '}
                </h2>

                <div>
                  <p>Total Quantity: {item.quantity} </p>
                  <p>Current Quantity: {item.quantity} </p>
                </div>
              </div>

              <Link
                to="borrowed/borrow"
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition  mx-6"
              >
                Borrow
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ItemList;
