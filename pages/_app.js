import { RobinhoodProvider } from "../context/RobinhoodContext.js";
import { MoralisProvider } from "react-moralis";

import "../styles/globals.css";


const serverUrl = process.env.MORALIS_SERVER_URL
const appId = process.env.MORALIS_APP_ID 

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={serverUrl}
      appId={appId}
    >
      <RobinhoodProvider>
        <Component {...pageProps} />
      </RobinhoodProvider>
    </MoralisProvider>
  );
}

export default MyApp;
