import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import ClientArea from "./container/ClientArea/ClientArea";
import Admin from "./container/Admin/Admin";
import Dishes from "./container/Admin/Dishes/Dishes";
import Orders from "./container/Admin/Orders/Orders";
import AddDish from "./container/Admin/AddDish/AddDish";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={(<ClientArea/>)}/>
        <Route path={"/admin"} element={(<Admin/>)}>
          <Route path={"dishes"} element={(<Dishes/>)}/>
          <Route path={"orders"} element={(<Orders/>)}/>
          <Route path={"new-dish"} element={(<AddDish/>)}/>
          <Route path={"new-dish/:id"} element={(<AddDish/>)}/>
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
