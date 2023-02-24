import PostFeed from "@/components/PostFeed";
import MetaTags from "@/components/MetaTags";
import Loader from "@/components/Loader";
import { firestore, fromMillis, postToJSON } from "@/lib/firebase";

import { useState } from "react";

const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    try {
      setLoading(true);
      const last = posts[posts.length - 1];

      const cursor =
        typeof last.createdAt === "number"
          ? fromMillis(last.createdAt)
          : last.createdAt;

      const query = firestore
        .collectionGroup("posts")
        .where("published", "==", true)
        .orderBy("createdAt", "desc")
        .startAfter(cursor)
        .limit(LIMIT);

      const newPosts = (await query.get()).docs.map((doc) => doc.data());

      setPosts(posts.concat(newPosts));
      setLoading(false);

      if (newPosts.length < LIMIT) {
        setPostsEnd(true);
      }
    } catch {
      setLoading(false);
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <MetaTags
        title="Home Page"
        description="Get the latest posts on our site"
      />

      <div className="card card-info">
        <h2>💡 Next.js + Firebase - The Full Course</h2>
        <p>
          Welcome! This app is built with Next.js and Firebase and is loosely
          inspired by Dev.to.
        </p>
        <p>
          Sign up for an 👨‍🎤 account, ✍️ write posts, then 💞 heart content
          created by other users. All public content is server-rendered and
          search-engine optimized.
        </p>
      </div>

      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </main>
  );
}
