import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Category.module.css";

const Category = () => {

    const [category, setCategory] = useState("");
    const [categoryData, setCategoryData] = useState([]);
    const [editId, setEditId] = useState(null);

    /* ---------- INSERT / UPDATE ---------- */

    const handleSave = () => {

        const formData = new FormData();
        formData.append("txt_category", category);

        if (editId) {

            axios.put(`http://127.0.0.1:8000/EditCategory/${editId}/`, {
                txt_category: category
            })
            .then((res) => {
                alert("Updated successfully");
                handleFetch();
                setCategory("");
                setEditId(null);
            })
            .catch(console.error);

        } else {

            axios.post("http://127.0.0.1:8000/category/", formData)
            .then((res) => {
                alert(res.data.message);
                handleFetch();
                setCategory("");
            })
            .catch(console.error);

        }

    };

    /* ---------- FETCH ---------- */

    const handleFetch = () => {

        axios.get("http://127.0.0.1:8000/category/")
        .then(res => setCategoryData(res.data.category))
        .catch(console.error);

    };

    useEffect(() => {
        handleFetch();
    }, []);

    /* ---------- DELETE ---------- */

    const handleDelete = (cid) => {

        axios.delete(`http://127.0.0.1:8000/DeleteCategory/${cid}/`)
        .then(res => {
            alert(res.data.message);
            handleFetch();
        })
        .catch(console.error);

    };

    /* ---------- EDIT ---------- */

    const handleEdit = (item) => {

        setCategory(item.category_name);
        setEditId(item.id);

    };

    /* ---------- CANCEL ---------- */

    const handleCancel = () => {

        setCategory("");
        setEditId(null);

    };

    return (

        <div className={styles.categoryPage}>

            {/* -------- INPUT TABLE -------- */}

            <table className={styles.formTable}>

                <thead>
                    <tr>
                        <td colSpan="2">
                            <h2>CATEGORY</h2>
                        </td>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>CATEGORY</td>
                        <td>
                            <input
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">

                            <button onClick={handleSave}>
                                {editId ? "Update" : "Save"}
                            </button>

                            <button
                                onClick={handleCancel}
                                style={{ marginLeft: 10 }}
                            >
                                Cancel
                            </button>

                        </td>
                    </tr>

                </tbody>

            </table>

            <br />

            {/* -------- DISPLAY TABLE -------- */}

            <table className={styles.dataTable}>

                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {categoryData.map((item, index) => (

                        <tr key={item.id}>

                            <td>{index + 1}</td>

                            <td>{item.category_name}</td>

                            <td>

                                <button
                                    onClick={() => handleEdit(item)}
                                    style={{ marginRight: 10 }}
                                >
                                    Edit
                                </button>

                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
};

export default Category;