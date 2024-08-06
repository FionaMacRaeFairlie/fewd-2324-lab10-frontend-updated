import React, { useState } from "react";
import OrderContext from "./OrderContext";
import OrderSummary from "./OrderSummary";
import SubmitOrder from "./SubmitOrder";

const FoodOrder = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const handleClick = (e, selectedItem) => {
    let newState = [...selectedItems, selectedItem];
    setSelectedItems(newState);
    console.log(selectedItems);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 submenu ">
            <h2 className=" justify-content-left headingStyleLeft">Menu</h2>
            <ul className="list-group">
              {items.map((item) => (
                <li
                  className="menu-list list-group-item"
                  key={item.id}
                  onClick={(e) => handleClick(e, item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <OrderContext.Provider value={[selectedItems, setSelectedItems]}>
            <div className="col-3">
              <OrderSummary />
            </div>
            <div className="col-5">
              <SubmitOrder />
            </div>
          </OrderContext.Provider>
        </div>
      </div>
    </>
  );
};
export default FoodOrder;
