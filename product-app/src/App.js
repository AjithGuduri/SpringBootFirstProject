// App.js
import React, { useEffect, useState } from "react";
import "./App.css";

// 🔥 Dummy API using local state (replace with your API if needed)
let mockData = [
  { id: 1, pname: "Laptop", price: 50000, qty: 2 },
  { id: 2, pname: "Phone", price: 20000, qty: 5 }
];

const getProducts = async () => ({ data: mockData });
const addProduct = async (p) => {
  mockData.push({ ...p, id: Date.now() });
};
const deleteProduct = async (id) => {
  mockData = mockData.filter((p) => p.id !== id);
};
const updateProduct = async (updated) => {
  mockData = mockData.map((p) => (p.id === updated.id ? updated : p));
};
const patchProduct = async (id, data) => {
  mockData = mockData.map((p) =>
    p.id === id ? { ...p, ...data } : p
  );
};
const getProductById = async (id) => ({
  data: mockData.find((p) => p.id == id)
});

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ pname: "", price: "", qty: "" });
  const [editId, setEditId] = useState(null);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getProducts();
    setProducts([...res.data]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.pname || !form.price || !form.qty) return alert("Fill all fields");

    if (editId) {
      await updateProduct({ ...form, id: editId });
      setEditId(null);
    } else {
      await addProduct(form);
    }

    await loadData();
    setForm({ pname: "", price: "", qty: "" });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditId(p.id);
  };

  const handlePatch = async (id) => {
    await patchProduct(id, { price: 999 });
    await loadData();
  };

  const handleSearch = async () => {
    if (!searchId) return;
    const res = await getProductById(searchId);
    setProducts(res.data ? [res.data] : []);
  };

  return (
    <div className="container">
      <h1>🛒 Product Manager</h1>

      <div className="card">
        <h2>{editId ? "Update Product" : "Add Product"}</h2>

        <input name="pname" value={form.pname} onChange={handleChange} placeholder="Name" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
        <input name="qty" value={form.qty} onChange={handleChange} placeholder="Qty" />

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <div className="card">
        <h3>🔍 Search</h3>
        <input placeholder="Enter ID" onChange={(e) => setSearchId(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
        <button onClick={loadData}>Reset</button>
      </div>

      <div className="list">
        {products.map((p) => (
          <div key={p.id} className="item">
            <p><b>{p.pname}</b></p>
            <p>₹{p.price}</p>
            <p>Qty: {p.qty}</p>

            <div className="actions">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
              <button onClick={() => handlePatch(p.id)}>Patch</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;



