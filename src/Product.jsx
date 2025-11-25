import "./index.css";
import { useCart } from "./context/CartContext.jsx";
import { useSelection } from "./context/SelectionContext.jsx";

function Product({ product, visible }) {
  const { addToCart } = useCart();
  const { isSelected, toggleSelected } = useSelection();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const handleSelectToggle = (e) => {
    e.stopPropagation();
    toggleSelected(product.id);
  };

  const selected = isSelected(product.id);

  return (
    <div className="flex flex-col relative w-[14vw] h-[42vh] mb-6">
      <div
        className={
          visible
            ? "block self-end w-7 h-7 absolute right-[-2] top-[-2]"
            : "hidden"
        }
      >
        <button
          onClick={handleSelectToggle}
          className={`w-7 h-7 flex items-center justify-center border-2 rounded-lg ${
            selected
              ? "bg-emerald-500 text-white border-emerald-600"
              : "bg-sky-100 border-black"
          }`}
          aria-pressed={selected}
          title={selected ? "Selected" : "Select item"}
        >
          {selected ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : null}
        </button>
      </div>

      <div className="w-[13.5vw] h-[40vh] bg-sky-800 flex flex-col rounded-2xl text-white">
        <img
          src={product.image}
          alt=""
          className="w-5/6 self-center mt-[1vw] rounded-xl aspect-square object-cover"
        />
        <div className="ml-4 mt-2 flex-1">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="font-light text-xs">{product.desc}</p>
          <h4 className="self-end mr-3 mt-2">{product.price}K</h4>
        </div>
        <button
          onClick={handleAddToCart}
          className="mx-3 mb-3 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
