import { useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import './styles.css';


import api from './services/api';


function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});


  async function handleSearch() {
    // 01310930/json/

    if(input === ''){
    alert("Preencha algum CEP")
    return;
    }

    try{
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setCep(response.data);
      setInput("");
      

    }catch{
      alert("CEP inválido, tente novamente");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">INTER<font color="red">CEP</font>TADOR</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite aqui seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
            <FaSearchLocation size={29} color="red"/>
        </button>
      
      </div>

        {Object.keys(cep).length > 0 && (
           <main className="main">
              <h2>CEP: {cep.cep}</h2>
    
              <span>{cep.logradouro}</span>
              <span>Complemento: {cep.complemento}</span>
              <span>{cep.bairro}</span>
              <span>{cep.localidade} - {cep.uf}</span>
              
            </main>
        )}
      
      </div>

  );
}

export default App;
