const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

const EXTERNAL_API_BASE_URL = "http://20.244.56.144/test/companies";
const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const CATEGORIES = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

// Fetching the products from Test Server based on the conditions that are provided by the user like company, category, minPrice, maxPrice, topN
async function fetchProducts(company, category, minPrice, maxPrice, topN, token) {
    try {
        const url = `${EXTERNAL_API_BASE_URL}/${company}/categories/${category}/products?top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching products from ${company}:`, error);
        return [];
    }
}

// Get top products in a category and also apply all the filters like minPrice, maxPrice, sortBy, order
app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    if (!CATEGORIES.includes(categoryname)) {
        return res.status(400).json({ error: "Invalid category" });
    }

    const topN = parseInt(req.query.n) || 10;
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || Infinity;

    const sortBy = req.query.sortBy || 'price';
    const order = req.query.order === 'desc' ? -1 : 1;

    const token = req.headers.authorization; 

    let allProducts = [];
    for (const company of COMPANIES) {
        const products = await fetchProducts(company, categoryname, minPrice, maxPrice, topN, token);
        allProducts = allProducts.concat(products);
    }

    allProducts.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1) * order);

    res.json(allProducts);
});

// Get product details by ID in a category 
app.get('/categories/:categoryname/products/:productid', (req, res) => {
    res.status(404).json({ error: "Endpoint not implemented" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
