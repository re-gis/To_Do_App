import React, { useState } from "react";
import List from "./List";

const ToDo = () => {
  const [input, setInput] = useState("");
  const [err, setErr] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      setErr("Please enter a todo!");
    } else {
      setErr("");
      setData(input);
      setInput("");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
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
        <List input={data} />
      </div>
    </div>
  );
};

export default ToDo;
