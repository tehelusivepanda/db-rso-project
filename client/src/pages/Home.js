import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/events").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div className="event" onClick={() => {history(`/viewevent/${value.id}`)}}>
            <div className="name"> {value.name} </div>
            <div className="description">{value.description}</div>
            <div className="category">{value.category}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;