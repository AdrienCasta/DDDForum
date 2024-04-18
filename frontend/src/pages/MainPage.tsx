import getPopularPosts from "@/api/getPopularPost";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import PostSwitcher from "@/components/PostSwitcher";
import { useUser } from "@/context/userContext";
import PopularPostRead from "@/domain/PopulatPostRead";
import { useEffect, useState } from "react";

const MainPage = () => {
  const { user } = useUser();
  const { popularPosts } = usePopularPosts();
  return (
    <body>
      <Layout>
        <Header user={user} />
        {popularPosts && <PostSwitcher posts={popularPosts} />}
      </Layout>
    </body>
  );
};

function usePopularPosts() {
  const [popularPosts, setPopularPosts] = useState<PopularPostRead[]>([]);

  const retreivePopularPosts = async () => {
    const response = await getPopularPosts();
    if (response.success) {
      setPopularPosts(response.data?.posts || []);
    }
  };

  useEffect(() => {
    retreivePopularPosts();
  }, []);

  return { popularPosts };
}

export default MainPage;
