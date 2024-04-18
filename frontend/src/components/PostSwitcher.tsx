import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostItem from "./PostItem";
import PopularPostRead from "@/domain/PopulatPostRead";

type PostSwitcherProps = {
  posts: PopularPostRead[];
};

const PostSwitcher: React.FC<PostSwitcherProps> = ({
  posts,
}: PostSwitcherProps) => {
  const postItem = posts.map((post) => (
    <li key={post.id} className="mb-10">
      <PostItem
        title={post.title}
        author={post.memberPostedBy.user.username}
        createdDate={post.dateCreated}
        commentsCount={post.comments.length}
        votesCount={post.votes.length}
      />
    </li>
  ));

  return (
    <Tabs defaultValue="new">
      <TabsList className="mb-4">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="old">Old</TabsTrigger>
      </TabsList>
      <TabsContent value="new">
        <ul>{postItem}</ul>
      </TabsContent>
      <TabsContent value="old">
        <ul>{postItem}</ul>
      </TabsContent>
    </Tabs>
  );
};

export default PostSwitcher;
