import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./shared/header/Header";
import Footer from "./shared/footer/Footer";
import NotFound from "./shared/NotFound/NotFound";
import ProjectList from "./components/project/ProjectList/ProjectList";
import DetailsProject from "./components/project/Details-project/Details-Project";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/details-project/:id" element={<DetailsProject />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
