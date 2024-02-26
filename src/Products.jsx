import { useState } from "react";
export default function Products() {
    const [perror, setpError] = useState(null);
    const [pdata, setpData] = useState([]);
    const [ploading, setpLoading] = useState(false);
    const [psent, setpSent] = useState(false);

    async function checkFile(e) {
        setpSent(false);
        setpData([]);
        setpLoading(true);
        e.preventDefault();
        const pdata = new FormData(e.target);
        const pres = await fetch(
            "https://verifycsv-server.onrender.com/products",
            {
                method: "POST",
                mode: "cors",
                body: pdata,
            }
        );
        if (pres.status == 200) {
            setpSent(true);
            const ans = await pres.json();
            setpData(ans);
            setpError(null);
            setpLoading(false);
        } else {
            setpError("Server failed");
            setpLoading(false);
        }

        setpLoading(false);
    }
    return (
        <div className="products">
            <h2
                style={{
                    color: "#bfbfbf",
                    marginBottom: 0,
                }}
            >
                Check Product
            </h2>
            <p
                style={{
                    color: "#bfbfbf",
                    marginTop: 0,
                }}
            >
                checks if products are correct.
            </p>
            <form onSubmit={checkFile} action="">
                <label
                    htmlFor=""
                    style={{
                        color: "#bfbfbf",
                    }}
                >
                    Upload products
                </label>
                <input
                    type="file"
                    required={true}
                    name="csv_products"
                    accept=".csv"
                />
                <div className="category_wrapper">
                    <div className="category">
                        <label
                            htmlFor=""
                            style={{
                                color: "#bfbfbf",
                            }}
                        >
                            Products Types
                        </label>
                        <input
                            type="file"
                            required={true}
                            name="csv_types"
                            accept=".csv"
                        />
                        <label
                            htmlFor=""
                            style={{
                                color: "#bfbfbf",
                            }}
                        >
                            Products Sub Types
                        </label>
                        <input
                            type="file"
                            required={true}
                            name="csv_sub_types"
                            accept=".csv"
                        />
                        <label
                            htmlFor=""
                            style={{
                                color: "#bfbfbf",
                            }}
                        >
                            Products Sub Sub Types
                        </label>
                        <input
                            type="file"
                            required={true}
                            name="csv_sub_sub_types"
                            accept=".csv"
                        />
                    </div>
                    <div className="category">
                        <label
                            htmlFor=""
                            style={{
                                color: "#bfbfbf",
                            }}
                        >
                            Products Applications
                        </label>
                        <input
                            type="file"
                            required={true}
                            name="csv_applications"
                            accept=".csv"
                        />
                        <label
                            htmlFor=""
                            style={{
                                color: "#bfbfbf",
                            }}
                        >
                            Products Sub Applications
                        </label>
                        <input
                            type="file"
                            required={true}
                            name="csv_sub_applications"
                            accept=".csv"
                        />
                    </div>
                    <div className="category">
                        <label
                            htmlFor=""
                            style={{
                                color: "#bfbfbf",
                            }}
                        >
                            Products Segments
                        </label>
                        <input
                            type="file"
                            required={true}
                            name="csv_segments"
                            accept=".csv"
                        />
                        <label
                            htmlFor=""
                            style={{
                                color: "#bfbfbf",
                            }}
                        >
                            Products Sub Segments
                        </label>
                        <input
                            type="file"
                            required={true}
                            name="csv_sub_segments"
                            accept=".csv"
                        />
                    </div>
                </div>
                <button type="submit">
                    {ploading ? "Loading..." : "Check Data"}
                </button>
                {perror && <p>{perror}</p>}
            </form>
            <div className="data">
                {pdata.length > 0 ? (
                    <div>
                        <div className="numbers">
                            <h3
                                style={{
                                    color: "#a3a3a3",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    margin: "0",
                                }}
                            >
                                <span
                                    style={{
                                        color: "tomato",
                                    }}
                                >
                                    {pdata.length}
                                </span>{" "}
                                Products with incorrect data.
                            </h3>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>product id</th>
                                    <th style={{ width: "10%" }}>
                                        product code
                                    </th>
                                    <th style={{ width: "20%" }}>column</th>
                                    <th style={{ width: "60%" }}>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pdata.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{item.id}</td>
                                            <td>{item.code}</td>
                                            <td>
                                                {item.columns.map((it, ky) => {
                                                    return <p key={ky}>{it}</p>;
                                                })}
                                            </td>
                                            <td>
                                                {item.comments.map((i, k) => {
                                                    return <p key={k}>{i}</p>;
                                                })}
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>
                ) : psent && pdata.length < 0 ? (
                    <p style={{ color: "green" }}>Your data is clean!</p>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
