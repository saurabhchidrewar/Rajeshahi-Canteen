import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Viewreport from "./Viewreport";
import Team from "./Team";
import PrintBill from "./PrintBill";
import "./App.css";
import "./Team.css";
import "./PrintBill.css";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewreport" element={<Viewreport />} />
        <Route path="/team" element={<Team />} />
        <Route path="/printbill" element={<PrintBill />} />
      </Routes>
  );
}