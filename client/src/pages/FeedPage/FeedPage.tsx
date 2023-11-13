import { Layout } from "antd";
export default function FeedPage() {
  const { Header, Content, Footer, Sider } = Layout;
  return (
    <Layout>
      <Sider></Sider>
      <Layout>
        <Header></Header>
        <Content>content</Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}
