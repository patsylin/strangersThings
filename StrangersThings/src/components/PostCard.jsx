import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePost, deletePost } from "../fetching";
import { useLocation } from "react-router-dom";

export default function PostCard({ post, token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState("");

  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    setTitle(loc.state.post.title);
    setDescription(loc.state.post.description);
    setPrice(loc.state.post.price);
    setLocation(loc.state.post.location);
    setWillDeliver(loc.state.post.willDeliver);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    async function editPost() {
      const updatedPost = {
        post: { title, description, price, location, willDeliver },
      };
      const editedPost = await updatePost(
        loc.state.post._id,
        updatedPost,
        token
      );
      return editedPost;
    }

    editPost();
  };

  return (
    <Fragment>
      <h1>Update Your Post</h1>
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
        {/* <input placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)} /> */}
        {/* <input type='box' placeholder="willDeliver" value={willDeliver} onChange={(e) => setWillDeliver(e.target.checked)} /> */}
        <button type="submit">Update</button>
      </form>

      <button onClick={() => deletePost(loc.state.post._id, token)}>
        Delete
      </button>

      <button onClick={() => nav(`/posts`)}>Back</button>
    </Fragment>
  );
}
