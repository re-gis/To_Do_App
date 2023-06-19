import React, { useEffect, useState } from "react";
import List from "./List";
import { toast } from "react-toastify";
import axios from "axios";

const ToDo = () => {
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState([]);
  const [result, setResult] = useState([]);
  const u = localStorage.getItem("userInfo");
  const user = JSON.parse(u)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === "") {
      setErr("Please enter a todo!");
    } else {
      try {
        setLoading(true);
        await axios.post("/api/todo", {
          title: "Todo" + Date.now(),
          description: input,
          user: user.id,
        });
        const { data } = await axios.get("/api/todo");
        if (data.length === 0) {
          console.log("No todo");
        } else {
          setRes([data]);
        }
        setInput("");
      } catch (error) {
        console.log(error)
        toast.error(error);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#c0c0c0",
          height: "30%",
          width: "50%",
          borderBottom: "1px solid #ccc",
        }}
      >
        <div className="text-center underline text-blue-400 text-lg">
          <h1>ToDo App</h1>
        </div>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <div>
            <h6>ToDo input</h6>
          </div>

          <div
            style={{
              width: "80%",
              border: "1px solid #ccc",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div style={{ width: "100%" }}>
              <input
                type="text"
                style={{
                  width: "100%",
                  border: "none",
                  height: "20px",
                  outline: "none",
                  padding: "5px",
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {err && (
                <div style={{ color: "red", fontSize: "10px" }}>{err}</div>
              )}
            </div>
            <div>
              <button
                style={{
                  width: "100%",
                  backgroundColor: "skyblue",
                  border: "none",
                  height: "20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "10px",
                }}
                onClick={handleSubmit}
              >
                Add a ToDo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#c0c0c0", height: "70%", width: "50%" }}>
        <List input={res} />
      </div>
    </div>
  );
};

export default ToDo;
