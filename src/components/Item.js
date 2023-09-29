import React from "react";

function Item({ data }) {
  return (
    <div className="shadow-md bg-white text-center">
      <p className="text-2xl p-10">{data.setup}</p>
      <p className="text-2xl p-10">{data.punchline}</p>
    </div>
  );
}

export default Item;
