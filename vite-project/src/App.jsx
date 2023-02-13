import { useState } from 'react';
import './App.css'

function App() {

  const [imageLink, setImageLink] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchLink = "https://api.thecatapi.com/v1/images/search/";

  function generate(e){
    e.preventDefault();
    setLoading(true);
    fetch(fetchLink)
    .then(res => res.json()
    .then(data => {
      setImageLink(data[0].url)
    })
    .finally(setTimeout(() => setLoading(false), 1000)));
  }

  function openFullScreen(link){
    window.open(link)
  }

  return (
    <>
      <div className="container">
        <h1 className="display-1">Générateur de chat</h1>
        <form onSubmit={generate}>
          <button disabled={loading} className="btn btn-primary">
            Générer un chat
          </button>
        </form>
        {imageLink != "" && (
          <img
            src={imageLink}
            className="mt-5 fetched-image"
            alt=""
            onClick={() => openFullScreen(imageLink)}
          />
        )}
      </div>
      <div className="footer">
        {imageLink != "" && (
          <p className="display-4 mt-5 text-light">
            Cliquer sur l'image pour l'ouvir en taille réel.
          </p>
        )}
      </div>
    </>
  );
}

export default App