import { useState } from "react";
import { fetchPosts, makePost } from "../fetching";

export default function CreatePostForm({ setPosts, token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    async function createPost() {
      const newPost = {
        title,
        description,
        price,
        willDeliver,
      };
      const result = await makePost(newPost, token);
      const updatePosts = await fetchPosts();
      setPosts(updatePosts.data.posts);
      return result;
    }
    createPost();

    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    setWillDeliver(false);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="checkbox"
          placeholder="willDeliver"
          value={willDeliver}
          onChange={(e) => setWillDeliver(e.target.checked)}
        />
        <button type="submit">Create Post</button>
      </form>
    </>
  );
}
