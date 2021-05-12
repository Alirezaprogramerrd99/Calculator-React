const Key = ({ onClick, text, keyMems, wide, blue }) => {
  return (
    <button
      onClick={onClick}
      className={["key", keyMems && "keyMems", wide && "wide", blue && "blue"].join(" ")}
    >
      {text}
    </button>
  );
};

export default Key;
