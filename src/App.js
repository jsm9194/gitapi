import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import IssueListPage from "./components/IssueListPage"
import IssueDetailPage from "./components/IssueDetailPage";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<IssueListPage/>}/>
        <Route path="issue-detail/:number" element={<IssueDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
