import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="font-inter bg-dodger-blue-light  bg-main">
        <Header />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
