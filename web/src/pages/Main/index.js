import { useState } from "react";
import api from "../../services/api";

import logo from "../../assets/logo.png";
import "./styles.css";

const Main = () => {
  const [newBox, setNewBox] = useState("");

  const handleInputChange = event => {
    setNewBox(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await api.post("boxes", {
      title: newBox,
    });

    console.log(response.data);
  };

  return (
    <div id="main-container">
      <form onSubmit={handleSubmit}>
        <div id="image-container">
          <img src={logo} alt="logo" />
        </div>
        <input placeholder="Criar um box" onChange={handleInputChange} />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default Main;
