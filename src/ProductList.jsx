import Product from "./Product.jsx";
import { useState, useEffect, useCallback } from "react";
import Counter from "./Counter.jsx";
import { useSelection } from "./context/SelectionContext.jsx";

// Helper to get CSRF token for Django POST requests
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function ProductList() {
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    desc: "",
    price: "",
    image: null, // Can be file or string, handle accordingly
  });
  const { selectedIds, clearSelected } = useSelection();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    const url = "http://127.0.0.1:8000/api/products/";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const rawData = await response.json();
      const productData = rawData.data || rawData;

      if (Array.isArray(productData)) {
        const items = productData.map((item) => ({
          id: item.item_id,
          name: item.item_name,
          desc: item.item_description,
          price: item.price,
          image: item.item_picture || 'https://via.placeholder.com/150',
        }));
        setProducts(items);
      } else {
        throw new Error("Fetched data is not an array");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setError(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSaveProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Product name and price are required.");
      return;
    }

    const url = "http://127.0.0.1:8000/api/products/";
    const csrftoken = getCookie('csrftoken');

    // We use FormData to handle file uploads, but it works for plain data too.
    const formData = new FormData();
    formData.append('item_name', newProduct.name);
    formData.append('item_description', newProduct.desc);
    formData.append('price', newProduct.price);
    if (newProduct.image && typeof newProduct.image !== 'string') {
        formData.append('item_picture', newProduct.image);
    }


    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrftoken,
        },
        body: formData, // Sending as FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save product: ${JSON.stringify(errorData)}`);
      }

      // It worked, reset form and refresh list
      setNewProduct({ name: "", desc: "", price: "", image: null });
      setIsAdding(false);
      await fetchItems(); // Refresh the list from the server

    } catch (error) {
      console.error("Error saving product:", error);
      alert(error.message);
    }
  };

  const handleDelete = async (productId) => {
    console.log("Attempting to delete product with ID:", productId); // For debugging
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this product (ID: ${productId})?`
    );
    if (!isConfirmed) {
      return;
    }

    const url = `http://127.0.0.1:8000/api/products/${productId}/`;
    const csrftoken = getCookie("csrftoken");

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": csrftoken,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // This is the specific error the user is seeing.
          // Inform the user clearly and refresh the list to sync state.
          alert(`Error: Product with ID ${productId} was not found on the server. It might have been deleted by someone else. Refreshing the list.`);
          fetchItems(); // Sync client state with server
          // We still throw to stop execution of this function, but the user is handled.
          throw new Error(`Product with ID ${productId} not found on the server.`);
        }
        
        // Handle other types of server errors
        const errorData = await response.json().catch(() => ({})); // Try to get error details
        throw new Error(
          `Failed to delete product. Server responded with status ${response.status}: ${
            JSON.stringify(errorData) || response.statusText
          }`
        );
      }

      // If deletion was successful on the server, give feedback and update local state
      alert(`Product with ID ${productId} deleted successfully.`);
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );

    } catch (error) {
      // This will catch errors from the fetch itself (e.g., network error)
      // or the errors we've thrown above.
      console.error("Error during product deletion:", error);
      
      // We only alert for unexpected errors, not for the 404 we handled gracefully.
      if (!error.message.includes("not found on the server")) {
        alert(`An unexpected error occurred: ${error.message}`);
      }
    }
  };


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
          {loading && <p className="text-center w-full">Loading products...</p>}
          {error && <p className="text-center w-full text-red-500">Error: {error}</p>}
          {!loading && !error && isAdding ? (
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
                  type="number"
                  className="mb-2 p-2 rounded border"
                />
                <input
                  type="file"
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, image: e.target.files[0] }))
                  }
                  className="mb-2 p-1 text-sm"
                />
                <div className="flex gap-2 mt-auto">
                  <button
                    className="bg-emerald-500 text-white py-1 px-2 rounded"
                    onClick={handleSaveProduct}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 py-1 px-2 rounded"
                    onClick={() => {
                      setIsAdding(false);
                      setNewProduct({ name: "", desc: "", price: "", image: null });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {!loading && !error && products.map((product) => (
            <Product
              key={product.id}
              product={product}
              visible={visible}
              setVisible={setVisible}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      {visible ? (
        <Counter
          onRemoveSelected={() => {
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
