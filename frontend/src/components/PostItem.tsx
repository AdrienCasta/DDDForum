import { Separator } from "./ui/separator";

interface PostItemProps {
  title: string;
  author: string;
  createdDate: string;
  commentsCount: number;
  votesCount: number;
}

const PostItem: React.FC<PostItemProps> = ({
  title,
  author,
  createdDate,
  commentsCount,
  votesCount,
}) => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <span>{votesCount}</span>
      <div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">{title}</h4>
          <p className="text-sm text-muted-foreground">Author: {author}</p>
        </div>
        <Separator className="my-1" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Date: {createdDate}</div>
          <Separator orientation="vertical" />
          <div>Comments: {commentsCount}</div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
