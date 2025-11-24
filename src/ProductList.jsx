import "./Product.jsx";
import Product from "./Product.jsx";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 10,
    image: "src/assets/product_1.png",
  },
  {
    id: 2,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 20,
    image: "src/assets/product_2.png",
  },
  {
    id: 3,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 30,
    image: "src/assets/product_3.png",
  },
  {
    id: 4,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 40,
    image: "src/assets/product_4.png",
  },
  {
    id: 5,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 50,
    image: "src/assets/product_5.png",
  },
  {
    id: 6,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 60,
    image: "src/assets/product_6.png",
  },

  {
    id: 7,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 70,
    image: "src/assets/product_7.png",
  },
  {
    id: 8,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 80,
    image: "src/assets/product_8.png",
  },
  {
    id: 8,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 80,
    image: "src/assets/product_8.png",
  },
  {
    id: 8,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 80,
    image: "src/assets/product_8.png",
  },
  {
    id: 8,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 80,
    image: "src/assets/product_8.png",
  },
  {
    id: 8,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 80,
    image: "src/assets/product_8.png",
  },
  {
    id: 8,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 80,
    image: "src/assets/product_8.png",
  },
];

function ProductList() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-sky-200 p-6 w-full flex flex-col">
        <h2 className="text-center font-bold text-2xl">Our Products</h2>
        <div className="self-end flex flex-row gap-5 mr-7 mt-[2vh]">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-8 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>

          <button class="remove" onClick={() => {setVisible(!visible)}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 12h14"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-row gap-[2vw] flex-wrap mt-[1vh] self-center">
          {products.map((product) => (
            <Product key={product.id} product={product} visible={visible} setVisible={setVisible}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
