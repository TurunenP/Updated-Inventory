import { useEffect, useState } from "react";
import API from "../API/Api";
import { Link } from "react-router-dom";

function LandingPage() {
  //   const [data, setData] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/api/items/");
      const result = await response.data;
      setItems(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      {items ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {items.length > 0 ? (
            items.map((item) => (
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
                    {" "}
                    {item.section}{" "}
                  </h2>

                  <div>
                    <p>Total Quantity: {item.quantity} </p>
                    <p>Current Quantity: {item.quantity} </p>
                  </div>
                </div>

                <Link
                  to="/login"
                  className="mt-4 bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mx-6"
                >
                  Borrow
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Loading...</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LandingPage;
