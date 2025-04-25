import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  // Handler for Add/Remove from Cart button
  function handleAddToCartClick() {
    // Call the PATCH API to update the item
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart, // Toggle the cart status
      }),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        // Notify parent component about the update
        if (onUpdateItem) onUpdateItem(updatedItem);
      })
      .catch((error) => console.error("Error updating item:", error));
  }

  // Handler for Delete button
  function handleDeleteClick() {
    // Call the DELETE API to remove the item
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Notify parent component about the deletion
          if (onDeleteItem) onDeleteItem(item);
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;