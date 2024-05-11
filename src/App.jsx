import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [totalGrade, setTotalGrade] = useState(0);
  const [milestone1, setMilestone1] = useState(0);
  const [milestone2, setMilestone2] = useState(0);
  const [terminalAssessment, setTerminalAssessment] = useState(0);
  const [error, setError] = useState(null);

  const calculateGrades = (e) => {
    e.preventDefault();
    try {
      let m1 = parseFloat(milestone1);
      let m2 = parseFloat(milestone2);
      let t = parseFloat(terminalAssessment);

      if (m1 < 0 || m1 > 25 || m2 < 0 || m2 > 40 || t < 0 || t > 35) {
        throw new Error(
          "Invalid input. Please enter values between 0 and the maximum points per milestone."
        );
      }

      let total = (m1 / 25) * 25 + (m2 / 40) * 40 + (t / 35) * 35;
      setTotalGrade(total.toFixed(2));
      setError(null);
    } catch (error) {
      setMilestone1(0);
      setMilestone2(0);
      setTerminalAssessment(0);
      alert(error.message);
      setError(true);
    }
  };
  return (
    <>
      <Navbar />
      <div className="content-divider">
        <div className="form-side-container">
          <form className="form-container" onSubmit={calculateGrades}>
            <label>Milestone 1</label>
            <input
              type="number"
              name="Milestone 1"
              onChange={(e) => setMilestone1(e.target.value)}
            />
            <label>Milestone 2</label>
            <input
              type="number"
              name="Milestone 2"
              onChange={(e) => setMilestone2(e.target.value)}
            />
            <label>Terminal Assessment</label>
            <input
              type="number"
              name="Terminal Assessment"
              onChange={(e) => setTerminalAssessment(e.target.value)}
            />
            <button type="submit">Calculate Grade</button>
          </form>
        </div>
        <div className="result-side-container">
          <h1>Grade: {totalGrade}</h1>
          {error && <p className="error-message">{error.message}</p>}
        </div>
      </div>
    </>
  );
}

export default App;
