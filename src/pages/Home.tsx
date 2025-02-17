import PostsList from "../components/blog/PostsList";
import TagsList from "../components/blog/TagsList";
import Layout from "../components/shared/Layout";

export default function Home() {
  return (
    <Layout>
      <TagsList />
      <PostsList />
    </Layout>
  )
}