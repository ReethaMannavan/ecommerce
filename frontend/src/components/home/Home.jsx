import { useEffect, useState } from "react";
import API from "../../api/api";
import ProductCard from "../../components/productlist/ProductCard";
import Filters from "../../components/productlist/Filters";
import Pagination from "../../components/productlist/Pagination";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("products/", {
          params: { page, category, ordering: sort },
        });

        // DRF paginated response has results
        setProducts(res.data.results);
        setHasNext(res.data.next !== null);
        setHasPrev(res.data.previous !== null);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [page, category, sort]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("categories/");
        // Use res.data.results if paginated; otherwise res.data
        setCategories(Array.isArray(res.data) ? res.data : res.data.results);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-8">
      <Filters
        categories={categories}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  );
}
