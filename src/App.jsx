import { useEffect, useState } from "react";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("London");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const api_key = "f9f1e027cbeb395ce6fa7f1f389cb39e";
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
      const response = await fetch(api);
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
      }
    } catch {
      console.error("Error fetching weather data");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (city) fetchWeather();
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
      setQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-400 to-pink-200 to-bg-purple-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Weather App</h1>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          className="p-2 border rounded-l-lg focus:outline-none"
          placeholder="Maukkan nama kota"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Cari kota
        </button>
      </form>

      {/* Weather Info */}
      {loading ? (
        <p>Loading...</p>
      ) : weather ? (
        <div className="bg-white/40 shadow-xl backdrop-3xl p-6 rounded-2xl shadow-lg w-80 text-center">
          <h2 className="text-4xl bg-gradient-to-r from-lime-600 to-blue-400 bg-clip-text text-transparent font-bold mb-2">{weather.name}</h2>
          <p className="text-lg text-gray-700">{weather.weather[0].main}</p>
          <p className="text-sm text-gray-500">{weather.weather[0].description}</p>
          <div className="my-4">
            <p className="text-4xl text-black font-bold">{weather.main.temp}°C</p>
            <p className="text-sm text-black">Feels like: {weather.main.feels_like}°C</p>
          </div>
          <div className="text-sm text-gray-600">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      ) : (
        <p>No data available. Try another city.</p>
      )}
    </div>
  );
};

export default App;
