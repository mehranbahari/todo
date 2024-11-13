import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./shared/header/Header";
import Footer from "./shared/footer/Footer";
import NotFound from "./shared/NotFound/NotFound";
import ProjectList from "./components/logs/ProjectList/ProjectList";
import DetailsProject from "./components/logs/Details-project/Details-Project";
import CreateTask from "./components/Tasks/CreateTask/CreateTask";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/details-project/:id" element={<DetailsProject />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
