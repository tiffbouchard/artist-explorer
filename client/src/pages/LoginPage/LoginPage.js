import Button from "../../components/Button/Button";

import logo from "../../images/Spotify_Icon_RGB_White.png";

import './LoginPage.scss';

const LoginPage = () => {

  return (
    <main class="login">
      <h1>Artist Explorer</h1>
      <Button logo={logo} link="http://localhost:8888/login" label="Login with Spotify" />
    </main>
    );
}
 
export default LoginPage;