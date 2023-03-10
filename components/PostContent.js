import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt == "number"
      ? new Date(post.createdAt)
      : post.createdAt;

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written By{" "}
        <Link href={`/${post.username}`}>
          <p className="text-info">@{post.username}</p>
        </Link>{" "}
        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
