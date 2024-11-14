//   -----------------------------------------------------------------------------------------------------------
// CONSULTA DE API COM TAXAS DE CÂMBIO 
const apiKey = 'c1aec72e7e30ee5797dbf838'; //Chave da Api 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Function to check the exchange rate via API

async function getExchangeRates(ofCoins, forCoins) {
    try {
        const response = await fetch(`${apiUrl}${ofCoins}`);
        const data = await response.json();

        if (data.result === "success") {
            return data.conversion_rates[forCoins];
        } else {
            throw new Error("Erro ao buscar taxa de câmbio");
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}

// ----------------------------------------------------------------------------------------------------------------------------
// Adiciona escutador de eventos do tipo submit
document.getElementById("Form-convert").addEventListener("submit", async function (event) {

    event.preventDefault();//Parar atualização da página

    // Obter valores de entrada
    const value = parseFloat(document.getElementById("value-amount").value); // Obter o valor inserido pelo usuário e convertê-lo para número decimal
    const ofCoins = document.getElementById("ofCoins").value; // Obter o tipo de moeda de origem selecionado
    const forCoins = document.getElementById("forCoins").value; // Obter o tipo de moeda de destino selecionado
    
    // Passa as moedas selecionadas para o esquema condicional
    const ExchangeRate = await getExchangeRates(ofCoins, forCoins);
    // Guarda valor 
    if(ExchangeRate) {
        const convertedValue = value * ExchangeRate;

        // Pega id do campo onde será exibido mensagem com o valor convetido 
        const converty = document.getElementById("conversao");
        converty.textContent = `Resultado: ${convertedValue.toFixed(2)} ${forCoins}`;
    } else {
        alert("Error fetching quote, Please try again");
    }
});