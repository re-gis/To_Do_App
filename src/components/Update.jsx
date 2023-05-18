import React, { useContext } from 'react'
import { Store } from '../Store';

const Update = () => {
  const {state, dispatch} = useContext(Store)
  const {data} = state
  return (
    <>
    {console.log(data)}
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
              <h6>ToDo Update</h6>
            </div>
            <div>
              <input
                type="text"
                style={{
                  width: "100%",
                  border: "none",
                  height: "20px",
                  outline: "none",
                  padding: "5px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update
