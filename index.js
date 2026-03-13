import express from "express";
import axios from "axios";
import dotenv from "dotenv";  //for api key being exposed
dotenv.config();

const app = express();
const port = 3000;

const API_KEY = process.env.API_KEY;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;

  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const weather = {
      city: result.data.name,
      temp: result.data.main.temp,
      humidity: result.data.main.humidity,
      description: result.data.weather[0].description,
      icon: result.data.weather[0].icon
    };

    res.render("index", { weather: weather, error: null });

  } catch (error) {
    console.log(error.message);
    res.render("index", { weather: null, error: "City not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});