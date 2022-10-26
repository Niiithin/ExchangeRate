import Forms from "./components/form";
import axios from "axios";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";

function App() {
  // axios
  //   .get("http://localhost:5000/api/exchange-rates/get-exchange-codes")
  //   .then((data) => console.log(data.data));

  // axios
  //   .post("http://localhost:5000/api/exchange-rates/get-exchange-rates", {
  //     code: "USD",
  //   })
  //   .then((data) => console.log(data.data));
  return (
    <>
      <Navbar />
      <Forms />
      <Stats />
    </>
  );
}

export default App;
