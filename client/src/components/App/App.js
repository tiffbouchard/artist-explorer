import { token } from "../../utils/spotifyService";
import Layout from "../../pages/Layout/Layout"
import LoginPage from "../../pages/LoginPage/LoginPage"

const App = (props) => {  
  return (
    <>
    {token ? <Layout {...props}/> : <LoginPage/> }
    </>
  );
}

export default App;