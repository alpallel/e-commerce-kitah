import "./index.css";
import { useCart } from "./context/CartContext.jsx";

function Product({ product, visible, setVisible }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <>
      {/* TINGGIKAN CARD dari h-[37vh] menjadi h-[42vh] */}
      <div className="flex flex-col relative w-[14vw] h-[42vh] mb-6">
        <div className={visible ? "block self-end w-7 h-7 bg-sky-100 border-black border-2 rounded-lg absolute" : "hidden"}>
          <button className=""></button>
        </div>
        
        {/* TINGGIKAN dari h-[35.5vh] menjadi h-[40vh] */}
        <div className="w-[13.5vw] h-[40vh] bg-sky-800 flex flex-col rounded-2xl text-white">
          <img
            src={product.image}
            alt=""
            className="w-5/6 self-center mt-[1vw] rounded-xl aspect-square object-cover"
          />
          <div className="ml-4 mt-2 flex-1"> {/* TAMBAH flex-1 */}
            <h3 className="font-semibold">{product.name}</h3>
            <p className="font-light text-xs">{product.desc}</p>
            <h4 className="self-end mr-3 mt-2">{product.price}K</h4>
          </div>
          
          {/* TOMBOL lebih lebar dan ada spacing */}
          <button 
            onClick={handleAddToCart}
            className="mx-3 mb-3 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;