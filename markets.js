const apiKey = '5025115b565557767236d6abaebb2c60'; // Replace with your actual API key

document.addEventListener('DOMContentLoaded', () => {
    const stockDataContainer = document.getElementById('stockData');
    const stockSymbolInput = document.getElementById('stockSymbol');
    const getStockDataBtn = document.getElementById('getStockDataBtn');

    // Function to fetch stock data based on the symbol entered
    const fetchStockData = async (symbol) => {
        stockDataContainer.innerHTML = '<p>Loading stock data...</p>';

        try {
            const response = await fetch(`https://api.marketstack.com/v2/eod?symbols=${symbol}&access_key=${apiKey}`);
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                const stock = data.data[0];
                stockDataContainer.innerHTML = `
                    <h3>${stock.symbol}</h3>
                    <p><strong>Price:</strong> $${stock.close}</p>
                    <p><strong>Open:</strong> $${stock.open}</p>
                    <p><strong>High:</strong> $${stock.high}</p>
                    <p><strong>Low:</strong> $${stock.low}</p>
                    <p><strong>Date:</strong> ${stock.date}</p>
                `;
            } else {
                stockDataContainer.innerHTML = '<p>No data available for this stock symbol.</p>';
            }
        } catch (error) {
            stockDataContainer.innerHTML = '<p>Error fetching stock data.</p>';
            console.error('Error fetching data:', error);
        }
    };

    // Event listener to fetch data when the button is clicked
    getStockDataBtn.addEventListener('click', () => {
        const symbol = stockSymbolInput.value.trim().toUpperCase();
        if (symbol) {
            fetchStockData(symbol);
        } else {
            stockDataContainer.innerHTML = '<p>Please enter a valid stock symbol.</p>';
        }
    });
});

