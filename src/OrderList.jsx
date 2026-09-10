import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import db from './firebase';
import './OrderList.css';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = collection(db, 'orders');

    // Listen for orders in real time
    const unsubscribe = onSnapshot(
      ordersRef,
      (snapshot) => {
        const orderData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort Order 1, Order 2, Order 3...
        orderData.sort((a, b) => {
          return (a.orderNumber || 0) - (b.orderNumber || 0);
        });

        setOrders(orderData);
      },
      (error) => {
        console.error('Error getting orders:', error);
      }
    );

    // Stop listening when page is closed
    return () => unsubscribe();
  }, []);

  // Mark order as completed and remove it
  const completeOrder = async (orderId, orderNumber) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to mark Order ${orderNumber} as completed?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'orders', orderId));

      console.log(`Order ${orderNumber} completed and removed.`);
    } catch (error) {
      console.error('Error removing order:', error);
      alert('❌ Failed to remove the order. Please try again.');
    }
  };

  return (
    <div className="order-list-container">
      <h1>🛒 Order List</h1>

      <div className="total-orders">
        <h2>Total Orders: {orders.length}</h2>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>No orders yet</h3>
          <p>New customer orders will appear here automatically.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              
              <div className="order-header">
                <h2>Order {order.orderNumber}</h2>
              </div>

              <div className="order-details">
                <p>
                  <strong>Customer:</strong>{' '}
                  {order.customerName || 'Not provided'}
                </p>

                <p>
                  <strong>Item:</strong>{' '}
                  {order.itemName || 'Not provided'}
                </p>

                <p>
                  <strong>Price:</strong>{' '}
                  ₹{order.price || 0}
                </p>

                <p>
                  <strong>Quantity:</strong>{' '}
                  {order.quantity || 0}
                </p>

                <p>
                  <strong>Place:</strong>{' '}
                  {order.place || 'Not provided'}
                </p>

                <p>
                  <strong>Section:</strong>{' '}
                  {order.section || 'Not provided'}
                </p>

                <p>
                  <strong>Order Number:</strong>{' '}
                  {order.orderNumber}
                </p>

                <p className="order-status">
                  🟢 New Order
                </p>

                <button
                  className="completed-btn"
                  onClick={() =>
                    completeOrder(order.id, order.orderNumber)
                  }
                >
                  ✅ Order Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderList;