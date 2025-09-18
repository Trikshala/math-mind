import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// Base URL of the API I used
const URL = "http://numbersapi.com";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// The default home page route displaying a random trivia fact
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(URL + "/random/math");
        res.render("index.ejs", { fact: response.data });
    } catch (error) {
        res.render("index.ejs", { fact: "Invalid input! Please enter a proper number or date." });
    }
});

// Post route that takes the user input
app.post("/get-fact", async (req, res) => {
    // Extracting the category and mode of the fact
    const type = req.body.category;
    const mode = req.body.modelSelect;
    try {
        // if its random, then the random endpoint is attached before the category
        if (mode === "random") {
            const response = await axios.get(URL + "/random/" + type);
            return res.render("index.ejs", { fact: response.data })
        }
        // if its custom, then user given input is extracted and used as the endpoint
        else if (mode === "custom") {
            const input = req.body.customInput;
            // Some basic input validation
            if (!input || input.trim() === "") {
                return res.render("index.ejs", { fact: "⚠️Input cannot be empty" });
            }
            if (["math", "trivia", "year"].includes(type)) {
                const num = Number(input);
                if (isNaN(num)) {
                    return res.render("index.ejs", { fact: "⚠️ Please provide a numeric input" });
                }
                if (num < 0) {
                    return res.render("index.ejs", { fact: "⚠️ Please provide a positive number" });
                }
                if (type === "year") {
                    if (!/^\d{1,4}$/.test(input)) {
                        return res.render("index.ejs", { fact: "⚠️ Year must be between 1 to 4 digits " });
                    }
                }
                const response = await axios.get(`${URL}/${num}/${type}`);
                return res.render("index.ejs", { fact: response.data });
            }
            if (type === "date") {
                if (!/^\d{1,2}\/\d{1,2}$/.test(input)) {
                    return res.render("index.ejs", { fact: "⚠️ Provide the date in MM/DD format" });
                }
                const [month, day] = input.split("/").map(Number);
                if (month < 1 || month > 12) return res.render("index.ejs", { fact: "⚠️ Month must be between 1 and 12" });
                if (day < 1 || day > 31) return res.render("index.ejs", { fact: "⚠️ Day must be between 1 and 31" });
                const response = await axios.get(`${URL}/${input}/${type}`);
                return res.render("index.ejs", { fact: response.data });
            }
            return res.render("index.ejs", { fact: response.data })
        }
        // Error handling in case of errors
    } catch (error) {
        return res.render("index.ejs", { fact: "Invalid input! Please enter a proper number or date." });
    }
})

app.listen(port, (req, res) => {
    console.log(`App running on server ${port}`);
});