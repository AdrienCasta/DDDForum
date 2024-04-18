export default interface PopularPostRead {
  id: string;
  memberId: string;
  postType: string;
  title: string;
  content: string;
  dateCreated: string;
  votes: {
    id: string;
    postId: string;
    memberId: string;
    voteType: string;
  }[];
  memberPostedBy: {
    id: string;
    userId: string;
    user: {
      id: string;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      password: string;
    };
  };
  comments: {
    id: string;
    postId: string;
    text: string;
    memberId: string;
    parentCommentId: string | null;
  }[];
}
