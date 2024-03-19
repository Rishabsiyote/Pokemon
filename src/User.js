// User.js
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPokemon, refreshPokemon } from "./redux/action";
import { fetchPokemon } from "./redux/action";
import Modal from "react-modal";
import Card from "./Card";

Modal.setAppElement("#root");
const User = ({
  pokemonList,
  loading,
  refreshPokemon,
  fetchPokemon,
  getPokemon,
  pokelist,
  nextUrl,
  prevUrl,
}) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [guessPokemon, setGuessPokemon] = useState(null);
  const [guessvalue, setGuessvalue] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [pokemonData, setPokemonData] = useState({
    HP: "",
    Attack: "",
    Defence: "",
    "Special-attack": "",
    "Special-defense": "",
    Speed: "",
  });
  const [game,setGame] = useState(false)
  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);
  useEffect(() => {
    getPokemon(pokemonList.pokemonList);
  }, [pokemonList]);

 const handleRefresh=()=>{
  const isConfirmed = window.confirm("Are you sure? If you refresh your all edits will removed?");
  if (isConfirmed) {
    refreshPokemon();
    fetchPokemon();
  }
 }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokemonData((prevData) => ({
      ...prevData,
      Name : selectedPokemon.name, 
      [name]: value,
    }));
  };
  const saveEdit = () => {
    // Save the values to local storage
    localStorage.setItem("editedPokemon", JSON.stringify(pokemonData));
    const keyValuePairs = Object.entries(pokemonData);
    keyValuePairs.map(([key, value],index) => {
     if(value && key!=='Name') selectedPokemon.stats[index].base_stat = value
     return 0;
    })
    // console.log(selectedPokemon.stats[0].base_stat)
    cancelEdit()
    // onCancel();
  };
  const cancelEdit = () => {
    setPokemonData({
      HP: "",
      Attack: "",
      Defence: "",
      "Special-attack": "",
      "Special-defense": "",
      Speed: "",
    });
    setEditMode(false)
  };
  const handleNextClick = (e) => {
    e.preventDefault();
    if (nextUrl) {
      fetchPokemon(nextUrl);
    }
  };
  // const handlePrevClick = (e) => {
  //   e.preventDefault();
  //   if (prevUrl) {
  //     // fetchPokemon(prevUrl);
  //   }
  // };
  // console.log(pokelist.length)
  const handleGame = () =>{
    const randomIndex = Math.floor(Math.random() * 50);
    const randompoke = Math.floor(Math.random() * 20);
    console.log(randomIndex+" "+randompoke)
    if(pokelist.length>(Math.abs(randomIndex))) return setGuessPokemon(pokelist[randomIndex].pokelist[randompoke])
    else return handleGame();
  }
  return (
    <div style={{ background: "#fff5d7", padding: "2rem" }}>
      <div style={{
        display:'flex',
        justifyContent:'center'
      }}>
        <button onClick={handleGame} style={{
                padding: "0.8rem",
                borderRadius: "12px",
                background: "#ff5e6c",
                color: "#000",
                fontWeight: "500",
                cursor: "pointer",
              }}> Play pokemon name guessing</button>
        </div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          textTransform: "uppercase",
          fontWeight: "800",
        }}
      >
        Pokemon List
      </h1>
      <div style={{
        display:'flex',
        justifyContent:'center'
      }}>

      <button
       style={{
        width: "80px",
        padding: "0.8rem",
        borderRadius: "12px",
        background: "transparent",
        border: "1px solid #000",
        color: "#000",
        fontWeight: "700",
        cursor: "pointer",
      }}
      onClick={handleRefresh}>Refresh</button>
      </div>
      {loading ? (
        <div
        style={{
          width: "100%",
            justifyContent: "center",
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          Loading...
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {pokelist.map((value) =>
              value.pokelist.map((pokemon, index) => (
                // console.log(val.sprites.front_default)
                <div style={{ margin: "1rem" }}>
                  <Card
                    name={pokemon.name}
                    icon={pokemon.sprites.front_default}
                    infoPokemon={(poke) => setSelectedPokemon(poke)}
                    item={pokemon}
                    key={index}
                  />
                </div>
              ))
            )}
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            {/* <button
              className="prev"
              style={{
                display: prevUrl === null ? "none" : "",
                width: "80px",
                padding: "0.8rem",
                borderRadius: "12px",
                background: "transparent",
                border: "1px solid #000",
                color: "#000",
                fontWeight: "700",
                cursor: "pointer",
              }}
              onClick={handlePrevClick}
              disabled={!prevUrl}
            >
              Previous
            </button> */}
            <button
              className="next"
              style={{
                width: "80px",
                padding: "0.8rem",
                borderRadius: "12px",
                background: "#ff5e6c",
                color: "#000",
                fontWeight: "700",
                cursor: "pointer",
              }}
              onClick={handleNextClick}
              disabled={!nextUrl}
            >
              Next
            </button>
          </div>
          <Modal
            isOpen={!!selectedPokemon}
            onRequestClose={() => setSelectedPokemon(null)}
            contentLabel="Pokemon Details"
            style={{
              content: {
                maxWidth: "500px",
                borderRadius: "12px",
                background: "#fff5d7",
                maxHeight: "450px",
                margin: "auto",
              },
            }}
          >
            {selectedPokemon && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div>
                  <img src={selectedPokemon.sprites.front_default} alt="img" />
                  <div
                    style={{
                      textTransform: "uppercase",
                      fontSize: "32px",
                      fontWeight: "700",
                    }}
                  >
                    {selectedPokemon.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {selectedPokemon.abilities.map((poke) => {
                      return (
                        <div
                          style={{
                            background: "#ff5e6c",
                            padding: "0.5rem 1.5rem",
                            marginTop: "1rem",
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "500",
                            borderRadius: "12px",
                            cursor: "pointer",
                            // border: "none",
                          }}
                        >
                          {poke.ability.name}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    {selectedPokemon.stats.map((poke) => {
                      return (
                        <>
                          <div style={{ fontSize: "16px", fontWeight: "700" }}>
                            {poke.stat.name}:{poke.base_stat}
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <button
                    onClick={()=>setEditMode(true)}
                    style={{
                      background: "#FFF",
                      border: "1px solid #000",
                      padding: "0.5rem 1.5rem",
                      marginTop: "1rem",
                      color: "#000",
                      marginRight: "1rem",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "12px",
                      cursor: "pointer",
                      // border: "none",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedPokemon(null)}
                    style={{
                      background: "#FFF",
                      border: "1px solid #000",
                      padding: "0.5rem 1.5rem",
                      marginTop: "1rem",
                      color: "#000",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "12px",
                      cursor: "pointer",
                      // border: "none",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </Modal>
          <Modal
            isOpen={editMode}
            onRequestClose={() => setSelectedPokemon(null)}
            contentLabel="Pokemon Details"
            style={{
              content: {
                maxWidth: "500px",
                borderRadius: "12px",
                background: "#fff5d7",
                maxHeight: "450px",
                margin: "auto",
              },
            }}
          >
            {selectedPokemon && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div>
                  <img src={selectedPokemon.sprites.front_default} alt="img" />
                  <div
                    style={{
                      textTransform: "uppercase",
                      fontSize: "32px",
                      fontWeight: "700",
                    }}
                  >
                    {selectedPokemon.name}
                  </div>
                  <div>
                    <label for="HP">HP : </label>
                    <input
                      type="number"
                      name="HP"
                      value={selectedPokemon.HP}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label for="Attack">Attack : </label>
                    <input
                      type="number"
                      name="Attack"
                      value={selectedPokemon.Attack}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label for="Defence">Defence : </label>
                    <input
                      type="number"
                      name="Defence"
                      value={selectedPokemon.Defence}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label for="Special-attack">Special-attack : </label>
                    <input
                      type="number"
                      name="Special-attack"
                      value={selectedPokemon["Special-attack"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label for="Special-defense">Special-defense : </label>
                    <input
                      type="number"
                      name="Special-defense"
                      value={selectedPokemon["Special-defense"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label for="Speed ">Speed : </label>
                    <input
                      type="number"
                      name="Speed"
                      value={selectedPokemon["Speed"]}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    onClick={cancelEdit}
                    style={{
                      background: "#FFF",
                      border: "1px solid #000",
                      padding: "0.5rem 1.5rem",
                      marginTop: "1rem",
                      color: "#000",
                      marginRight: "1rem",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "12px",
                      cursor: "pointer",
                      // border: "none",
                    }}
                  >
                    cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    style={{
                      background: "#FFF",
                      border: "1px solid #000",
                      padding: "0.5rem 1.5rem",
                      marginTop: "1rem",
                      color: "#000",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "12px",
                      cursor: "pointer",
                      // border: "none",
                    }}
                  >
                    save
                  </button>
                </div>
              </div>
            )}
          </Modal>
          <Modal
            isOpen={!!guessPokemon}
            onRequestClose={() => setGuessPokemon(null)}
            contentLabel="Pokemon Details"
            style={{
              content: {
                maxWidth: "500px",
                borderRadius: "12px",
                background: "#fff5d7",
                maxHeight: "450px",
                margin: "auto",
              },
            }}
          >
            {guessPokemon && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div>
                  <img style={{filter:'brightness(0%)',}} src={guessPokemon.sprites.front_default} alt="img" />
                  <div
                    style={{
                      textTransform: "uppercase",
                      fontSize: "28px",
                      fontWeight: "600",
                    }}
                  >
                    Guess the name of that pokemon
                  </div>
                  <div>
                  <input onChange={(e)=>setGuessvalue(e.target.value.toUpperCase())}style={{ textTransform: "uppercase",
                      fontSize: "24px",
                      borderRadius:'20px',
                      fontWeight: "400",}}></input>
                  </div>
                  <div
                    style={{
                      display:'none',
                      textTransform: "uppercase",
                      fontSize: "32px",
                      fontWeight: "700",
                    }}
                  >
                    {guessPokemon.name}
                  </div>
                
                  <button
                    onClick={handleGame}
                    style={{
                      background: "#FFF",
                      border: "1px solid #000",
                      padding: "0.5rem 1.5rem",
                      marginTop: "1rem",
                      color: "#000",
                      marginRight: "1rem",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "12px",
                      cursor: "pointer",
                      // border: "none",
                    }}
                  >
                  Retry
                  </button>
                  <button
                    onClick={() => setGuessPokemon(null)}
                    style={{
                      background: "#FFF",
                      border: "1px solid #000",
                      padding: "0.5rem 1.5rem",
                      marginTop: "1rem",
                      color: "#000",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "12px",
                      cursor: "pointer",
                      // border: "none",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      )}
      ;
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemonList: state.pokemonList,
  pokelist: state.pokelist,
  loading: state.loading,
  error: state.error,
  nextUrl: state.nextUrl,
  prevUrl: state.prevUrl,
});

const mapDispatchToProps = {
  fetchPokemon,
  getPokemon,
  refreshPokemon
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
