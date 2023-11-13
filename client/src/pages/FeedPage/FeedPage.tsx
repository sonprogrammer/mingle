import { Layout } from "antd";
import { SearchComponent } from "../../components";
export default function FeedPage() {
  const { Header, Content, Footer, Sider } = Layout;
  return (
    <Layout>
      <Sider></Sider>
      <Layout>
        <Header style={{ textAlign: "center" }}>
          <SearchComponent />
        </Header>
        <Content>content</Content>
        <Footer></Footer>
      </Layout>
      <Sider></Sider>
    </Layout>
  );
}
