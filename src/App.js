import "./App.css"
// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Card from "./Card";


Modal.setAppElement("#root");

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      getPokemon(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokemonList((state) => {
        state = [...state, result.data];
        // console.log(state)
        return state;
      });
    });
  };

  const closeDetails = () => {
    setSelectedPokemon(null);
  };

  const handleNextClick = () => {
    if (nextUrl) {
      setUrl(nextUrl);
    }
  };

  const handlePrevClick = () => {
    if (prevUrl) {
      setUrl(prevUrl);
    }
  };

  return (
    <div style={{ background: "#fff5d7", padding: "2rem" }}>
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
            {pokemonList.map((pokemon) => (
              <div style={{ margin: "1rem" }}>
                <Card
                  name={pokemon.name}
                  icon={pokemon.sprites.front_default}
                  infoPokemon={(poke) => setSelectedPokemon(poke)}
                  item={pokemon}
                />
              </div>
            ))}
          </div>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <button className="prev"
              style={{
                width: "80px",
                padding: "0.8rem",
                borderRadius: "12px",
                background: "#ff5e6c",
                color: "#000",
                fontWeight: "700",
                cursor:'pointer'
              }}
              onClick={handlePrevClick}
              disabled={!prevUrl}
            >
              Previous
            </button>
            <button className="next"
              style={{
                width: "80px",
                padding: "0.8rem",
                borderRadius: "12px",
                background: "transparent",
                border: "1px solid #000",
                color: "#000",
                fontWeight: "700",
                cursor:'pointer'
              }}
              onClick={handleNextClick}
              disabled={!nextUrl}
            >
              Next
            </button>
          </div>

          <Modal
            isOpen={!!selectedPokemon}
            onRequestClose={closeDetails}
            contentLabel="Pokemon Details"
            style={{
              content: {
                maxWidth: '500px', 
                borderRadius:'12px',
                background:'#fff5d7',
                maxHeight:'450px',
                margin: 'auto',
              },
            }}
          >
            {selectedPokemon && (
              // <div>
              //   <h2>{selectedPokemon.name}</h2>
              //   <p>Height: {selectedPokemon.height}</p>
              //   <p>Weight: {selectedPokemon.weight}</p>
              //   {/* Add more details as needed */}
              //   <button onClick={closeDetails}>Close</button>
              // </div>
              <div style={{display:'flex',justifyContent:'center',textAlign:'center'}}>
              <div>
                <img src={selectedPokemon.sprites.front_default} alt="img"/>
                <div style={{textTransform:'uppercase',fontSize:'32px',fontWeight:'700'}}>{selectedPokemon.name}</div>
                <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',justifyContent:'center'}}>
               {selectedPokemon.abilities.map(poke=>{
                                return(
                                  <div
                                  style={{
                                    background: '#ff5e6c',
                                    padding: "0.5rem 1.5rem",
                                    marginTop:'1rem',
                                    color: "#fff",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    borderRadius: "12px",
                                    cursor:'pointer'
                                    // border: "none",
                                  }}
                                >
                                  {poke.ability.name}
                                </div>
                                )
                            })}
                            </div>
                            <div style={{textAlign:'center',marginTop:'1rem'}}>
                        {
                            selectedPokemon.stats.map(poke=>{
                                return(
                                    <>
                                        <div style={{fontSize:'16px',fontWeight:'700'}}>{poke.stat.name}:{poke.base_stat}</div>
                                    </>
                                )
                            })
                        }
                    </div>
             
                <button
        onClick={closeDetails}
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
          Close
        </button>
              </div>
              </div>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
};

export default App;
