const Menu = ({ text, position }) => {
  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        background: "white",
        border: "1px solid black",
        padding: "5px",
        zIndex: 1000,
      }}
    >
      {text}
    </div>
  );
};
export default Menu;
