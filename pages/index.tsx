import type { NextPage } from "next";
import Layout from "components/Layout";
import Tabs from "../components/Tabs";

const Home: NextPage = () => {
  return (
    <Layout>
      <Tabs />
    </Layout>
  );
};

export default Home;
