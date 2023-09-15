import Layout from "@/layouts";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
};

export default App;
