import logo from "../../assets/logo.png";
import "./styles.css";

const Main = () => {
  return (
    <div id="main-container">
      <form action="">
        <div id="image-container">
          <img src={logo} alt="logo" />
        </div>
        <input placeholder="Criar um box" />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default Main;
