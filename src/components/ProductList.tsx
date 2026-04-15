import { useState } from 'react';
import type { Product } from '../types';
import { ProductItem } from './ProductItem';

interface ProductListProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
}

const INITIAL_COUNT = 10;
const STEP = 10;

export function ProductList({ products, onAddToCart }: ProductListProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + STEP, products.length));
  };

  return (
    <div className="product-list-container">
      <div className="product-list">
        {visibleProducts.map((product) => (
          <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
      {hasMore && (
        <button className="load-more" onClick={loadMore}>
          Показать ещё
        </button>
      )}
    </div>
  );
}