import { RobinhoodProvider } from "../context/RobinhoodContext.js";
import { MoralisProvider } from "react-moralis";

import "../styles/globals.css";
import '../styles/Home.module.css';


const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <RobinhoodProvider>
        <Component {...pageProps} />
      </RobinhoodProvider>
    </MoralisProvider>
  );
}

export default MyApp;
