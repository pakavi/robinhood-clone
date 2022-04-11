import { RobinhoodProvider } from "../context/RobinhoodContext.js";

import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <RobinhoodProvider>
      <Component {...pageProps} />
    </RobinhoodProvider>
  );
}

export default MyApp;
