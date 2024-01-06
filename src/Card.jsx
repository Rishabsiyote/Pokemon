

function Card({icon,name,infoPokemon,item}) {
  return (
    <div
      style={{
        padding: "0.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#FFF",
        width: "220px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          background: '#ffaaab',
          borderRadius: "10px 10px 150px 0px",
          display: "flex",
          justifyContent: "center",
        }}
      >
       <img src={icon} alt={"icon"}/>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "700",
          textTransform: "uppercase",
          marginTop: "1rem",
        }}
      >
        {name}
      </div>
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "500",
            width: "80%",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          {desc}
        </div>
      </div> */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <button
        onClick={()=>infoPokemon(item)}
          style={{
            background: '#FFF',
            border:'1px solid #000',
            padding: "0.5rem 1.5rem",
            marginTop:'1rem',
            color: "#000",
            fontSize: "16px",
            fontWeight: "700",
            borderRadius: "12px",
            cursor:'pointer'
            // border: "none",
          }}
        >
          Details
        </button>
      </div>
    </div>
  );
}
export default Card;
