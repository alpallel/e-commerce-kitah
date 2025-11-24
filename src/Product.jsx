import "./index.css";

function Product({ product, visible, setVisible }) {
  return (
    <>
      <div className="flex flex-col relative w-[14vw] h-[37vh]">
        <div className={visible ? "block self-end w-7 h-7 bg-sky-100 border-black border-2 rounded-lg absolute" : "hidden"}>
          <button className=""></button>
        </div>
        <div className="w-[13.5vw] h-[35.5vh] bg-sky-800 flex flex-col rounded-2xl text-white mt-auto">
          <img
            src={product.image}
            alt=""
            className="w-5/6 self-center mt-[1vw] rounded-xl aspect-square"
          />
          <div className="ml-4 mt-2">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="font-light text-xs">{product.desc}</p>
          </div>
          <h4 className="self-end mr-3 mt-1">{product.price}K</h4>
        </div>
      </div>
    </>
  );
}

export default Product;
