import "./App.css";
import Images from "./Component/Images";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import ViewImages from "./Component/ViewImages";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Images/>}/>
      <Route path='/ViewImages' element={<ViewImages/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
