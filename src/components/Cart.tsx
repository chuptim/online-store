import { useMutation } from '@tanstack/react-query';
import type { Product, CartItem, OrderItem } from '../types';
import { createOrder } from '../services/api';

interface CartProps {
  cart: CartItem[];
  products: Product[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onOrderSuccess: () => void;
}

export function Cart({
  cart,
  products,
  onUpdateQuantity,
  onRemoveItem,
  onOrderSuccess,
}: CartProps) {
  const cartItemsWithDetails = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return {
        productId: item.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    })
    .filter(Boolean) as OrderItem[];

  const totalPrice = cartItemsWithDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const { mutate, isPending } = useMutation({
    mutationFn: () => createOrder(cartItemsWithDetails),
    onSuccess: () => {
      onOrderSuccess();
    },
    onError: (error) => {
      alert(`Ошибка: ${error.message}`);
    },
  });

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Корзина пуста');
      return;
    }
    mutate();
  };

  if (cart.length === 0) {
    return <div className="cart empty">Корзина пуста</div>;
  }

  return (
    <div className="cart">
      <h2>Корзина</h2>
      <ul>
        {cartItemsWithDetails.map((item) => (
          <li key={item.productId}>
            <span>
              {item.name} — {item.price} ₽ × {item.quantity} = {item.price * item.quantity} ₽
            </span>
            <div className="cart-actions">
              <button
                onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                disabled={isPending}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                disabled={isPending}
              >
                +
              </button>
              <button
                className="remove"
                onClick={() => onRemoveItem(item.productId)}
                disabled={isPending}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <strong>Итого: {totalPrice} ₽</strong>
      </div>
      <button onClick={handleCheckout} disabled={isPending}>
        {isPending ? 'Оформление...' : 'Оформить заказ'}
      </button>
    </div>
  );
}