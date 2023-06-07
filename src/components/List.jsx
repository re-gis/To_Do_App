import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = ({ input }) => {
  const [todos, setTodos] = useState([]);
  const [update, setUpdate] = useState(false);
  const [up, setUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [complete, setComplete] = useState(true);
  const [td, setTd] = useState()

  const getTodos = async () => {
    try {
      const { data } = await axios.get("/api/todo");
      if (data.length === 0) return;
      setResult([data]);
    } catch (error) {
      console.log(error);
      toast.error("No todo found!");
    }
  };

  useEffect(() => {
    getTodos();
  }, [input]);

  const handleRemove = async (todo) => {
    try {
      await axios.delete(`/api/todo/${todo}`);
      const { data } = await axios.get("/api/todo");
      if (data.length === 0) {
        console.log("No todo");
      } else {
        setResult([data]);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred!");
    }
  };
  const handleRemoveAll = async () => {
    try {
      await axios.delete("/api/todo");
      const { data } = await axios.get("/api/todo");
      if (data.length === 0) {
        console.log("No todo");
      } else {
        setResult([data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (todo) => {
    setTd(todo)
    setUpdate(!update);
  };


  const handleUpdateSub = async(todo) => {
    try {
      await axios.put(`/api/todo/${todo}`, {
        desc: up
      })     
      const { data } = await axios.get("/api/todo");
      if (data.length === 0) {
        console.log("No todo");
      } else {
        setResult([data]);
      }
      
      setUpdate(false)
      setUp('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleComplete = async (todo) => {
    try {
      const { data } = await axios.put(`/api/todo/${todo}/complete`, {
        complete,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCompleted = async () => {
    try {
      await axios.delete("/api/todo/complete/todos");
      const { data } = await axios.get("/api/todo");
      if (data.length === 0) {
        console.log("No todo");
      } else {
        setResult([data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          height: "80%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
          overflowY: "scroll",
          paddingBottom: "120px",
        }}
      >
        <div>
          <h6>ToDo List</h6>
        </div>
        <div className="flex gap-2 flex-col md:flex-row ">
          <button
            style={{
              width: "100px",
              backgroundColor: "skyblue",
              border: "none",
              height: "20px",
              color: "white",
              fontSize: "10px",
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            Completed
          </button>
          <button
            style={{
              width: "100px",
              backgroundColor: "skyblue",
              border: "none",
              height: "20px",
              color: "white",
              fontSize: "10px",
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            Pending
          </button>
          <button
            style={{
              width: "100px",
              backgroundColor: "skyblue",
              border: "none",
              height: "20px",
              color: "white",
              fontSize: "10px",
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            overflowY: "scroll",
            height: "50%",
          }}
          className="w-auto md:w-72"
        >
          <ol
            style={{
              fontSize: "10px",
              padding: "0px 5px 0px 5px",
              width: "100%",
            }}
          >
            {result.length === 0 ? (
              <div>
                <span>No todos found!</span>
              </div>
            ) : (
              result[0].todos?.map((todo) => (
                <div
                  style={{
                    borderBottom: "1px solid #ccc",
                    padding: "5px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={todo._id}
                >
                  <li style={{ padding: "2px" }}>{todo.description}</li>
                  <div className="flex items-center md:gap-2">
                    <input
                      style={{ width: "13px" }}
                      type="checkbox"
                      name="done"
                      id="done"
                      value={complete}
                      onChange={() => {
                        handleComplete(todo._id);
                        setComplete(!complete);
                      }}
                      className="ml-9 md:ml-0"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="blue"
                      style={{ width: "13px", cursor: "pointer" }}
                      onClick={() => handleUpdate(todo._id)}
                      className="hidden md:flex"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      style={{ width: "13px", cursor: "pointer" }}
                      onClick={() => handleRemove(todo._id)}
                      className="hidden md:flex"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              ))
            )}
          </ol>
          {update && (
            <div>
              <input
                style={{
                  width: "100%",
                  border: "none",
                  height: "20px",
                  outline: "none",
                  padding: "5px",
                  fontSize: "10px",
                }}
                type="text"
                placeholder="Update"
                value={up}
                onChange={(e) => setUp(e.target.value)}
              />
              <button
                style={{
                  width: "100px",
                  backgroundColor: "lightgreen",
                  border: "none",
                  height: "20px",
                  color: "white",
                  fontSize: "10px",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleUpdateSub(td);
                }}
              >
                Update
              </button>
            </div>
          )}
        </div>
        {/* Rest of the component code */}
        {/* ... */}
        <div className="flex gap-2 flex-col md:flex-row">
          <button
            style={{
              width: "100px",
              backgroundColor: "red",
              border: "none",
              height: "20px",
              color: "white",
              fontSize: "10px",
              borderRadius: "2px",
              cursor: "pointer",
            }}
            onClick={() => handleRemoveAll()}
          >
            Delete All
          </button>
          <button
            style={{
              width: "100px",
              backgroundColor: "red",
              border: "none",
              height: "20px",
              color: "white",
              fontSize: "10px",
              borderRadius: "2px",
              cursor: "pointer",
            }}
            onClick={() => deleteCompleted()}
          >
            Delete Completed
          </button>
        </div>
      </div>
    </>
  );
};

export default List;
