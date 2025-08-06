const COHORT_NAME = `2306-GHP-ET-WEB-FT`;
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { username, password },
      }),
    });

    const result = await response.json();
    console.log("Register result:", result);

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.error || { message: "Registration failed" },
      };
    }

    return result;
  } catch (err) {
    console.error("Register error:", err);
    return {
      success: false,
      error: { message: "Network error. Please try again." },
    };
  }
};

// // REGISTER
// export const registerUser = async (username, password) => {
//   try {
//     const response = await fetch(`${BASE_URL}/users/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: { username, password },
//       }),
//     });
//     const result = await response.json();
//     console.log("Register result:", result);
//     return result;
//   } catch (err) {
//     console.error("Register error:", err);
//   }
// };

// LOGIN
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { username, password },
      }),
    });
    const result = await response.json();
    console.log("Login result:", result);

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.error || { message: "Login failed" },
      };
    }

    return result;
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      error: { message: "Network error. Please try again." },
    };
  }
};

// FETCH POSTS
export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const result = await response.json();
    console.log("Fetched posts:", result);

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.error || { message: "Failed to fetch posts" },
      };
    }

    return result.data.posts || [];
  } catch (err) {
    console.error("Fetch posts error:", err);
    return {
      success: false,
      error: { message: "Network error. Please try again." },
    };
  }
};

// MAKE POST
export const makePost = async (post, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post }),
    });
    const result = await response.json();
    console.log("Post result:", result);

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.error || { message: "Post creation failed" },
      };
    }

    return result;
  } catch (err) {
    console.error("Post creation error:", err);
    return {
      success: false,
      error: { message: "Network error. Please try again." },
    };
  }
};

// UPDATE POST
export const updatePost = async (postId, post, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    const result = await response.json();
    console.log("Update post result:", result);
    return result;
  } catch (err) {
    console.error("Update post error:", err);
  }
};

// DELETE POST
export const deletePost = async (postId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("Delete post result:", result);
    return result;
  } catch (err) {
    console.error("Delete post error:", err);
  }
};

// Export BASE_URL just in case
export { BASE_URL };
