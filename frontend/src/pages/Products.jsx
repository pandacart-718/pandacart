
import "./Products.css";

import Header from "../components/Header";

const products = [
  { id: 1, name: "Kurkure", price: 14, image: "/images/kurkure.png" },
  { id: 2, name: "5 Star", price: 13, image: "/images/5star.png" },
  { id: 3, name: "Dairy Milk", price: 14, image: "/images/dairymilk.png" },
  { id: 4, name: "Chips", price: 7, image: "/images/chips.png" },
  { id: 5, name: "Cake", price: 24, image: "/images/cake.png" },
  { id: 6, name: "Pepsi", price: 25, image: "/images/pepsi.png" },
  { id: 7, name: "Sprite", price: 25, image: "/images/sprite.png" },
  { id: 8, name: "Coca Cola", price: 25, image: "/images/cocacola.png" },
];

export default function Products() {
  return (
    <>
      <Header />
      <div className="page">
        <div className="products">
          {products.map((p) => (
            <div className="product-card" key={p.id}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <div className="price">₹{p.price}</div>
              <div className="product-actions">
                <button>Add to Cart</button>
                <button className="buy-btn">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
