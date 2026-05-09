import { useState } from "react";
import axios from "axios";

const url = "http://127.0.0.1:8000/predict";

function App() {
  const [store, setStore] = useState(0);
  const [dow, setDow] = useState(0);
  const [promo, setPromo] = useState(0);
  const [state_holiday, setStateHoliday] = useState("");
  const [school_holiday, setSchoolHoliday] = useState(0);
  const [date, setDate] = useState("");
  const [prediction, setPrediction] = useState("");

  async function predict(e) {
    e.preventDefault();

    try {
      const res = await axios.post(url, {
        store: Number(store),
        day_of_week: Number(dow),
        promo: Number(promo),
        state_holiday: state_holiday,
        school_holiday: Number(school_holiday),
        date: date,
      });

      console.log(res.data);

      setPrediction(res.data.predicted_sales);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Rossmann Sales Prediction</h1>

      <div className="container">
        <form className="form-container">

          <input
            onChange={(e) => setStore(e.target.value)}
            placeholder="Enter store number"
          />

          <input
            onChange={(e) => setDow(e.target.value)}
            placeholder="Day of week"
          />

          <input
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Promo"
          />

          <input
            onChange={(e) => setStateHoliday(e.target.value)}
            placeholder="State holiday"
          />

          <input
            onChange={(e) => setSchoolHoliday(e.target.value)}
            placeholder="School holiday"
          />

          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />

          <button onClick={predict} type="submit">
            Predict
          </button>

        </form>

        <p>Prediction: {prediction}</p>
      </div>
    </>
  );
}

export default App;