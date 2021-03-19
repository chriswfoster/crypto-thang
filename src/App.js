import "./App.css";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import router from "./core/router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
const { Sider, Header, Content, Footer } = Layout;

function App(props) {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider>Sider</Sider>
      <Layout>
        <Header>
          <HeaderContent />
        </Header>
        <Content>{router}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, {})(App);

const HeaderContent = () => {
  const [selKey, setKey] = useState(["1"]);

  useEffect(() => {
    let splitLoc = window.location.href.split("/");
    const location = splitLoc[splitLoc.length - 1];
    switch (location) {
      case "CoinsTable":
        setKey(["2"]);
        break;
      case "Tags":
        setKey(["3"]);
        break;

      default:
        setKey(["1"]);
    }
  }, []);

  console.log(window.location.href);
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={selKey}
      selectedKeys={selKey}
    >
      <Menu.Item key="1" onClick={() => setKey(["1"])}>
        <Link to="/">Main Screen</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setKey(["2"])}>
        <Link to="/CoinTable">Coins Table</Link>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setKey(["3"])}>
        <Link to="/Tags">Tags</Link>
      </Menu.Item>
    </Menu>
  );
};
