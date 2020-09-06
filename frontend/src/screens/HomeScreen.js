import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Rating from "../components/Rating";

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setsortOrder] = useState("");
  const [category, setCategory] = useState("");
  // const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));
    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
    setsortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const searchCategory = (e) => {
    setCategory(e.target.value);
    dispatch(listProducts(category));
  };

  return (
    <>
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          <select name="category" onChange={searchCategory}>
            <option value="">All Products</option>
            <option value="Female Wears">Female Wears</option>
            <option value="Female Lingeries">Female Lingeries</option>
            <option value="Female Wears">Female Wears</option>
            <option value="Body Shapers">Body Shapers</option>
            <option value="Men Underwears">Men Underwears</option>
            <option value="Men Wears">Men Wears</option>
            <option value="Children Wears">Children Wears</option>
            <option value="Back to School">Back to School</option>
            <option value="Shoes and Bags">Shoes and Bags</option>
            <option value="Household Items">Household Items</option>
            <option value="Kitchen Wears">Kitchen Wears</option>
            {/* <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option> */}
          </select>
        </li>
      </ul>
      <ul className="product-category-name">
        <li>{category && <h2>{category}</h2>}</li>
      </ul>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={"/product/" + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-detail">
                  <div className="product-name">
                    <Link to={"/product/" + product._id}>{product.name}</Link>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">
                    <span>&#8358;</span>
                    {product.price
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </div>
                  <div className="product-rating">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + " reviews"}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default HomeScreen;
