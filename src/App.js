
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import router from './core/router';
import { Link } from 'react-router-dom';
const { Sider, Header, Content, Footer } = Layout;


function App() {
  return (
    <Layout style={{height: '100vh'}}>
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
export default App;

const HeaderContent = () => {

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Link to="/">Main Screen</Link></Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
  )
}