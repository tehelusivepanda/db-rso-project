import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function ViewRso() {
  const [listOfRso, setListOfRso] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/rsos").then((response) => {
      setListOfRso(response.data);
    });
  }, []);

  return (
    <div>
      {listOfRso.map((value, key) => {
        return (
          <div className="event" onClick={() => {history(`/viewrso/${value.id}`)}}>
            <div className="name"> {value.name} </div>
            <div className="description">{value.description}</div>
            <div className="category">{value.leader}</div>
            <div className="category">{value.university}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ViewRso;