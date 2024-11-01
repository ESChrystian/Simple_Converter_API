//   -----------------------------------------------------------------------------------------------------------
// CONSULTA DE API COM TAXAS DE CÂMBIO 
const apiKey = "c1aec72e7e30ee5797dbf838"; //Chave da Api 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Função para consultar a taxa de câmbio via api

async function getExchangeRates (inCoins, ForCoins) {
    try {
        const response = await fetch(`${apiUrl}${inCoins}`);
        const data = response.json();
        
        if(data === "success"){
            return data.conversion_rates[ForCoins];
        } else {
            throw new Error ("Erro ao buscar taxa de câmbio");
        }
    }catch (error){
        console.error("Error", error);
        return null;
    }
}