import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import ClientArea from "./container/ClientArea/ClientArea";
import Admin from "./container/Admin/Admin";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={(<ClientArea />)} />
        <Route path={"/admin"} element={(<Admin />)} />
      </Routes>
    </Layout>
  );
}

export default App;
