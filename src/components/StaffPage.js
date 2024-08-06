import React, { useEffect, useState, useCallback } from "react";
import Login from "./Login";
import useToken from "./useToken";

export default function StaffPage() {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken();
  const [orders, setOrders] = useState([
    { name: "", table: "", foodOrder: [""], orderNumber: "" },
  ]);

  const fetchData = useCallback(() => {
    const settings = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    const url = "http://localhost:3001/viewOrders";
    fetch(url, settings)
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData);
        let customerOrder = [
          { name: "", table: "", foodOrder: [], orderNumber: '' },
        ];
        let formattedData = incomingData.map((item, index) => {
          let orderNumber = item._id;
          let name = item.order[0];
          let table = item.order[1];
          let foodOrder = item.order.slice(2, item.order.length);
          customerOrder[index] = { name, table, foodOrder, orderNumber };
        });

        setOrders(customerOrder);
      })
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const removeProcessedOrder = (e, item) => {  
     let processedOrder = [item.orderNumber];
     const orderString = JSON.stringify(processedOrder);
     console.log(orderString)  
    fetch(`http://localhost:3001/removeOrder`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*     ",
        "Content-Type": "application/json",
        Authorization: token
      },
      body:orderString,
    })
      .catch((err) => {
        console.log(err);
      });

    let updatedOrders = orders.filter((element) => {
      return element !== item;
    });
    setOrders(updatedOrders);
  };

  return (
    <div className="container-fluid">
      <h1 className="headingStyleLeft">Staff Dashboard</h1>
      <button className="button btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
      <div>
        <h2 className="headingStyleLeft">Current Orders </h2>
        <p>Click on a card to remove a processed order</p>
        {orders.map((item) => (
          <div
            className="card"
            key={item.orderNumber}
            onClick={(e) => removeProcessedOrder(e, item)}
          >
            <div className="card-body">
              <h3 className="card-title">Table number: {item.table}</h3>
              <h5>Customer name: {item.name}</h5>
              {item.foodOrder.map((element) => (
                <p>{element}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
