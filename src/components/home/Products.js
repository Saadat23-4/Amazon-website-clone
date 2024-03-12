import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

function Products() {
  const data = useLoaderData();
  const productData = data.data;
  return <div>Products</div>;
}

export default Products;
