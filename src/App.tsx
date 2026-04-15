import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import type { CartItem } from './types';
import { fetchProducts } from './services/api';
import './App.css';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const addToCart = useCallback((productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const handleOrderSuccess = useCallback(() => {
    setCart([]);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <div className="loading">Загрузка товаров...</div>;
  if (error) return <div className="error">Ошибка загрузки</div>;

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="products-section">
          <h2>Наши сыры</h2>
          <ProductList products={products} onAddToCart={addToCart} />
        </div>
        <div className="cart-section">
          <Cart
            cart={cart}
            products={products}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onOrderSuccess={handleOrderSuccess}
          />
        </div>
      </main>
      <Footer />

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>Заказ оформлен!</p>
            <button onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;