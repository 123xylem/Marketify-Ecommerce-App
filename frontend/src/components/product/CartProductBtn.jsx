/* eslint-disable react/prop-types */
export function CartProductBtn({ action, id, onClick }) {
  const add = action == "add";

  return (
    <>
      <button
        className={`cart-btn min-w-min py-1 px-2 bg-pink-600 border  rounded-md cursor-pointer hover:text-underline text-white font-bold ${add ? "bg-gray-800" : "bg-red-500"}`}
        onClick={onClick}
        value={[id, action]}
      >
        {add ? " +1" : "-1"}
      </button>
    </>
  );
}
