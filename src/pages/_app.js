import "@/styles/globals.css";
import "react-quill/dist/quill.snow.css";
import Layout from "../components/Layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
