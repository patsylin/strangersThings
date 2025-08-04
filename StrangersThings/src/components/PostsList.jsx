import { useEffect, useState } from "react";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";
import { fetchPosts } from "../fetching";

export default function PostsList({ token }) {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  async function getPosts() {
    const p = await fetchPosts();
    if (Array.isArray(p)) {
      setPosts(p);
      setAllPosts(p);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const search = (query) => {
    const filtered = allPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

    setPosts(filtered);

    if (filtered.length === 0) {
      setTimeout(() => {
        console.log("No matches. Reloading.");
        getPosts();
      }, 1000);
    }

    return filtered;
  };

  return (
    <>
      <h1>Posts List</h1>
      <input
        placeholder="search by title here"
        onChange={(e) => search(e.target.value)}
      />
      <CreatePostForm setPosts={setPosts} token={token} />
      {posts.map((post) => (
        <Post key={post._id} post={post} token={token} />
      ))}
    </>
  );
}

// import { useEffect, useState } from "react";
// import Post from "./Post";
// import CreatePostForm from "./CreatePostForm";
// import { fetchPosts } from "../fetching";

// export default function PostsList({ token }) {
//   const [posts, setPosts] = useState([{ id: 1, title: "Example Post" }]);

//   async function getPosts() {
//     const p = await fetchPosts();
//     setPosts(p.);
//     return p.data.posts;
//   }

//   useEffect(() => {
//     getPosts();
//   }, []);

//   const search = (query) => {
//     console.log(query);
//     const filtered = posts.filter((post) => {
//       return post.title === query || post.title.includes(query);
//     });

//     setPosts(filtered);

//     if (filtered.length === 0) {
//       setTimeout(() => {
//         console.log("Did not find any matches, reloading");
//         getPosts();
//       }, 500);
//     }

//     return filtered;
//   };

//   return (
//     <>
//       <h1>Posts List</h1>
//       <input
//         placeholder="search by title here"
//         onChange={(e) => {
//           search(e.target.value);
//         }}
//       />
//       <CreatePostForm setPosts={setPosts} token={token} />
//       {posts.map((post) => {
//         return <Post key={post.id} post={post} token={token} />;
//       })}
//     </>
//   );
// }
