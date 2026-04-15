import type { Product } from '../types';

interface ProductItemProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export function ProductItem({ product, onAddToCart }: ProductItemProps) {
  const colors = ['#F5A623', '#E8C396', '#D48B1D', '#F0D5A8', '#C29B4A', '#E69500', '#D98C2B'];
  const colorIndex = parseInt(product.id) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div className="product-card">
      <div className="product-color-block" style={{ backgroundColor: bgColor }}>
        <span>{product.name}</span>
      </div>
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p className="price">{product.price} ₽ / шт.</p>
      <button onClick={() => onAddToCart(product.id)}>Добавить в корзину</button>
    </div>
  );
}