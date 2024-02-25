import { useState } from "react";
import "./App.css";

function App() {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    async function checkFile(e) {
        setSent(false);
        setLoading(true);
        e.preventDefault();
        const file = e.target.csv_file.files;
        const data = new FormData(e.target);
        if (file.length > 0) {
            const res = await fetch("http://127.0.0.1:5000/", {
                method: "POST",
                mode: "cors",
                body: data,
            });
            if (res.status == 200) {
                setSent(true);
                const ans = await res.json();
                setData(ans);
                setError(null);
                setLoading(false);
            } else {
                setError("Server failed");
                setLoading(false);
            }
        } else {
            setError("Please upload file");
        }
        setLoading(false);
    }
    return (
        <div className="container">
            <div className="App">
                <h2
                    style={{
                        color: "#bfbfbf",
                        marginBottom: 0,
                    }}
                >
                    Check Product Specs
                </h2>
                <p
                    style={{
                        color: "#bfbfbf",
                        marginTop: 0,
                    }}
                >
                    checks if product specs are correct.
                </p>
                <form onSubmit={checkFile} action="">
                    <label
                        htmlFor=""
                        style={{
                            color: "#bfbfbf",
                        }}
                    >
                        Upload prod spec csv file
                    </label>
                    <input
                        type="file"
                        required={true}
                        name="csv_file"
                        accept=".csv"
                        id="csv_file"
                    />
                    <button type="submit">
                        {loading ? "Loading..." : "Check Data"}
                    </button>
                    {error && <p>{error}</p>}
                </form>
                <div className="data">
                    {data.length > 0 ? (
                        <div>
                            <h3
                                style={{
                                    color: "#a3a3a3",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    margin: "40px 0",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "2rem",
                                        color: "tomato",
                                    }}
                                >
                                    {data.length}
                                </span>{" "}
                                Products with incorrect data.
                            </h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: "10%" }}>
                                            spec id
                                        </th>
                                        <th style={{ width: "20%" }}>column</th>
                                        <th style={{ width: "70%" }}>data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{item.id}</td>
                                                <td>
                                                    {item.column.map(
                                                        (it, ky) => {
                                                            return (
                                                                <p key={ky}>
                                                                    {it}
                                                                </p>
                                                            );
                                                        }
                                                    )}
                                                </td>
                                                <td>
                                                    {item.data.map((i, k) => {
                                                        return (
                                                            <p key={k}>{i}</p>
                                                        );
                                                    })}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr></tr>
                                </tbody>
                            </table>
                        </div>
                    ) : sent && data.length < 0 ? (
                        <p style={{ color: "green" }}>Your data is clean!</p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <p>by Kwanele</p>
        </div>
    );
}

export default App;
