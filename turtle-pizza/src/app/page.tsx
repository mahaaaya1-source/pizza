'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '@/store/store';
import { fetchDishes } from '@/store/dishes/dishesThunks';
import { addToCart, removeFromCart, clearCart } from '@/store/cart/cartSlice';
import { createOrder } from '@/store/orders/ordersThunks';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const dishes = useSelector((s: RootState) => s.dishes.items);
  const loading = useSelector((s: RootState) => s.dishes.loading);
  const cartItems = useSelector((s: RootState) => Object.values(s.cart.items));

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const productsTotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cartItems]
  );

  const delivery = cartItems.length > 0 ? 150 : 0;
  const orderTotal = productsTotal + delivery;

  const canOrder = cartItems.length > 0 && name.trim() && address.trim() && phone.trim();

  const openCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const handleOrder = () => {
    if (!canOrder) return;

    // Формат заказа по ТЗ: { dishId: qty }
    const payload = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as Record<string, number>);

    dispatch(createOrder(payload));
    dispatch(clearCart());

    setName('');
    setAddress('');
    setPhone('');

    setIsCheckoutOpen(false);
    alert('Заказ отправлен!');
  };

  return (
    <main className="container py-3" style={{ maxWidth: 520 }}>
      <h1 className="mb-3">Turtle Pizza</h1>

      {loading && <p>Loading...</p>}

      <div className="d-flex flex-column gap-2">
        {dishes.map((dish: any) => (
          <button
            key={dish.id}
            className="btn btn-light border d-flex align-items-center gap-3 text-start"
            onClick={() => dispatch(addToCart({ id: dish.id, title: dish.title, price: dish.price }))}
          >
            <img
              src={dish.image}
              alt={dish.title}
              width={56}
              height={56}
              style={{ objectFit: 'cover', borderRadius: 6 }}
            />
            <div className="flex-grow-1">
              <div style={{ fontWeight: 600 }}>{dish.title}</div>
            </div>
            <div style={{ fontWeight: 700 }}>{dish.price} KGS</div>
          </button>
        ))}
      </div>

      <div className="border-top mt-3 pt-3 d-flex justify-content-between align-items-center">
        <div>
          <div style={{ fontWeight: 600 }}>Order total: {productsTotal} KGS</div>
        </div>
        <button className="btn btn-outline-dark" onClick={openCheckout}>
          Checkout
        </button>
      </div>

      {/* Checkout Modal (как по ТЗ) */}
      {isCheckoutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(0,0,0,0.35)', zIndex: 50 }}
          onClick={closeCheckout}
        >
          <div
            className="bg-white border rounded p-3 position-absolute start-50 translate-middle-x"
            style={{ width: 'min(520px, 92vw)', top: 60 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="h5 mb-3">Your order:</h2>

            {cartItems.length === 0 ? (
              <p className="mb-3">Cart is empty</p>
            ) : (
              <>
                <div className="d-flex flex-column gap-2 mb-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center">
                      <div>
                        {item.title} x {item.quantity}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ fontWeight: 700 }}>{item.price * item.quantity} KGS</div>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-1 d-flex justify-content-between">
                  <div>Delivery</div>
                  <div style={{ fontWeight: 700 }}>{delivery} KGS</div>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <div>Total</div>
                  <div style={{ fontWeight: 800 }}>{orderTotal} KGS</div>
                </div>

                {/* Форма пользователя (по ТЗ) */}
                <div className="mb-2">
                  <input
                    className="form-control mb-2"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Адрес"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    className="form-control"
                    placeholder="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary w-50" onClick={closeCheckout}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-dark w-50"
                    onClick={handleOrder}
                    disabled={!canOrder}
                  >
                    Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
