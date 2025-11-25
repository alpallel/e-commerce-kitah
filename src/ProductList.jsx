import Product from "./Product.jsx";
import { useState } from "react";
import Counter from "./Counter.jsx";
import { useSelection } from "./context/SelectionContext.jsx";

const initialProducts = [
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
    id: 9,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 80,
    image: "src/assets/product_8.png",
  },
  {
    id: 10,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 80,
    image: "src/assets/product_8.png",
  },
  {
    id: 11,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 80,
    image: "src/assets/product_8.png",
  },
  {
    id: 12,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 80,
    image: "src/assets/product_8.png",
  },
  {
    id: 13,
    name: "Basic Chair",
    desc: "This is a basic chair",
    price: 80,
    image: "src/assets/product_8.png",
  },
];

function ProductList() {
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    desc: "",
    price: "",
    image: "",
  });
  const { selectedIds, clearSelected } = useSelection();

  return (
    <>
      <div className="min-h-screen bg-sky-200 p-6 w-full flex flex-col">
        <h2 className="text-center font-bold text-2xl">Our Products</h2>
        <div className="self-end flex flex-row gap-5 mr-7 mt-[2vh]">
          <button onClick={() => setIsAdding(true)} className="add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>

          <button
            className="remove"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
        </div>
        <div className="flex flex-row gap-[2vw] flex-wrap mt-[1vh] self-center">
          {isAdding ? (
            <div className="flex flex-col relative w-[14vw] h-[42vh] mb-6">
              <div className="w-[13.5vw] h-[40vh] bg-sky-100 flex flex-col rounded-2xl text-black p-3">
                <input
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Name"
                  className="mb-2 p-2 rounded border"
                />
                <input
                  value={newProduct.desc}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, desc: e.target.value }))
                  }
                  placeholder="Description"
                  className="mb-2 p-2 rounded border"
                />
                <input
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, price: e.target.value }))
                  }
                  placeholder="Price"
                  className="mb-2 p-2 rounded border"
                />
                <input
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, image: e.target.value }))
                  }
                  placeholder="Image URL"
                  className="mb-2 p-2 rounded border"
                />
                <div className="flex gap-2 mt-auto">
                  <button
                    className="bg-emerald-500 text-white py-1 px-2 rounded"
                    onClick={() => {
                      // basic validation
                      if (!newProduct.name) return;
                      const nextId = products.length
                        ? Math.max(...products.map((p) => p.id)) + 1
                        : 1;
                      setProducts((prev) => [
                        {
                          id: nextId,
                          name: newProduct.name,
                          desc: newProduct.desc || "",
                          price: Number(newProduct.price || 0),
                          image: newProduct.image || "",
                        },
                        ...prev,
                      ]);
                      setNewProduct({
                        name: "",
                        desc: "",
                        price: "",
                        image: "",
                      });
                      setIsAdding(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 py-1 px-2 rounded"
                    onClick={() => {
                      setIsAdding(false);
                      setNewProduct({
                        name: "",
                        desc: "",
                        price: "",
                        image: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              visible={visible}
              setVisible={setVisible}
            />
          ))}
        </div>
      </div>
      {/* show Counter only when the minus icon (visible) is toggled */}
      {visible ? (
        <Counter
          onRemoveSelected={() => {
            // remove selected cards from products and clear the selection
            setProducts((prev) =>
              prev.filter((p) => !selectedIds.includes(p.id))
            );
            clearSelected();
          }}
        />
      ) : null}
    </>
  );
}

export default ProductList;
