import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "./Quiz";

function App() {
  return (
    <>
      <Router>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&display=swap"
          rel="stylesheet"
        />
        <Routes>
          <Route path="/" element={<Quiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
