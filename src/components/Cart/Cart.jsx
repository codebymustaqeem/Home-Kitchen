import React, { useState } from 'react';
import { 
  FaTimes, FaTrash, FaPlus, FaMinus, 
  FaWhatsapp, FaMapMarkerAlt, FaShoppingBag 
} from 'react-icons/fa';
import './Cart.scss';

const Cart = ({ 
  isOpen, 
  onClose, 
  cart, 
  updateQuantity, 
  removeFromCart, 
  clearCart, 
  cartTotal,
  location 
}) => {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const deliveryCharge = cartTotal >= 299 ? 0 : 39;
  const gst = (cartTotal + deliveryCharge) * 0.05;
  const grandTotal = cartTotal + deliveryCharge + gst;

  const formatOrderMessage = () => {
    const itemsText = cart.map(item => 
      `${item.quantity}x ${item.name} - ₹${(item.price * item.quantity).toFixed(0)}`
    ).join('\n');

    return `*NEW ORDER - FoodHub*\n\n` +
           `*Customer Details:*\n` +
           `Name: ${customerName || 'Not provided'}\n` +
           `Phone: ${customerPhone || 'Not provided'}\n\n` +
           `*Delivery Address:*\n${location || 'Not provided'}\n\n` +
           `*Order Items:*\n${itemsText}\n\n` +
           `*Order Summary:*\n` +
           `Subtotal: ₹${cartTotal.toFixed(0)}\n` +
           `Delivery: ₹${deliveryCharge.toFixed(0)}\n` +
           `GST (5%): ₹${gst.toFixed(0)}\n` +
           `*Total: ₹${grandTotal.toFixed(0)}*\n\n` +
           `*Special Instructions:*\n${specialInstructions || 'None'}\n\n` +
           `*Order Time:* ${new Date().toLocaleString('en-IN', { 
             timeZone: 'Asia/Kolkata',
             dateStyle: 'full',
             timeStyle: 'short' 
           })}\n\n` +
           `_Please confirm this order._`;
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty! Add some items first.');
      return;
    }

    if (!location || location === 'Enter your delivery address') {
      alert('Please enter your delivery address first!');
      return;
    }

    setIsWhatsAppModalOpen(true);
  };

  const sendWhatsAppOrder = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please enter your name and phone number');
      return;
    }

    const phoneNumber = '919876543210'; // Replace with your number
    const message = encodeURIComponent(formatOrderMessage());
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    
    // Clear cart and close
    clearCart();
    setIsWhatsAppModalOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      
      <div className="cart-container">
        <div className="cart-header">
          <h2>
            <FaShoppingBag /> Your Cart
            {cart.length > 0 && <span className="item-count">({cart.length} items)</span>}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add delicious items from our menu!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <div className="item-details">
                        <span className="price">₹{item.price.toFixed(0)} each</span>
                        <span className="veg-badge">{item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}</span>
                      </div>
                    </div>

                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <div className="item-total">
                        <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                      </div>

                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="location-section">
                <FaMapMarkerAlt />
                <div className="location-info">
                  <span className="label">Delivering to</span>
                  <span className="address">{location}</span>
                </div>
              </div>

              <div className="cart-summary">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(0)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Delivery Charge</span>
                  <span className={deliveryCharge === 0 ? 'free' : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(0)}`}
                  </span>
                </div>
                
                <div className="summary-row">
                  <span>GST (5%)</span>
                  <span>₹{gst.toFixed(0)}</span>
                </div>
                
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span className="grand-total">₹{grandTotal.toFixed(0)}</span>
                </div>

                {cartTotal < 299 && (
                  <div className="free-delivery-note">
                    Add ₹{(299 - cartTotal).toFixed(0)} more for FREE delivery!
                  </div>
                )}
              </div>

              <div className="cart-actions">
                <button 
                  className="whatsapp-order-btn"
                  onClick={handleWhatsAppOrder}
                >
                  <FaWhatsapp /> Order on WhatsApp
                </button>
                
                <button 
                  className="clear-cart-btn"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* WhatsApp Modal */}
      {isWhatsAppModalOpen && (
        <div className="whatsapp-modal-overlay">
          <div className="whatsapp-modal">
            <div className="modal-header">
              <h3>Confirm Order Details</h3>
              <button 
                className="close-modal"
                onClick={() => setIsWhatsAppModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter your WhatsApp number"
                />
              </div>

              <div className="form-group">
                <label>Special Instructions (Optional)</label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests or dietary restrictions..."
                  rows="3"
                />
              </div>

              <div className="order-preview">
                <h4>Order Preview</h4>
                <div className="preview-items">
                  {cart.map(item => (
                    <div key={item.id} className="preview-item">
                      <span>{item.quantity}x {item.name}</span>
                      <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
                <div className="preview-total">
                  <span>Total:</span>
                  <span>₹{grandTotal.toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsWhatsAppModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="send-btn"
                onClick={sendWhatsAppOrder}
                disabled={!customerName.trim() || !customerPhone.trim()}
              >
                <FaWhatsapp /> Send Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;