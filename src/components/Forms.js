import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Posts from "./Posts";

const Forms = () => {
  const [post, setPost] = useState({
    userId: 50,
  });
  const [posts, setPosts] = useState();
  const [error, setError] = useState({});
  const [isPosting, setPosting] = useState(false);
  const [isOpened, setOpened] = useState(false);
  const [singlePost, setSinglePost] = useState({})

  const getPost = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        // setPosts(response)
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        let newData = [];
        if (data) {
          for (let i = 0; i < 10; i++) {
            newData.push(data[i]);
          }
          console.log(newData);
          if (newData) setPosts(newData);
        }
      });
    // console.log(posts);
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleSetPost = ({ name, value }) => {
    if (!value) {
      setError((prevError) => {
        return { ...prevError, [name]: "This field is required" };
      });
    } else {
      setError((prevError) => {
        return { ...prevError, [name]: "" };
      });
      setPost((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!post.title) {
      setError((prevError) => {
        return { ...prevError, title: "You need to enter your title" };
      });
    }
    if (!post.body) {
      setError((prevError) => {
        return { ...prevError, body: "You need to enter your body" };
      });
    } else {
      setPosting(true);
      setError({});
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 201) {
          alert("Post Created Successfully");
          setPosting(false);
        }
      });
    }
  };
  const handleFetchSinglePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => setSinglePost(json));
  };
  const handleShowModal = (id) => {
    handleFetchSinglePost(id);
    setOpened(!isOpened);
  };
  
  return (
    <div>
      {isOpened && (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
          className="absolute  h-full items-center justify-center top-0 bottom-0 right-0 left-0"
        >
          <Modal singlePost={singlePost} setOpened={setOpened} />
        </div>
      )}

      <form
        onSubmit={handleSubmitPost}
        className="flex px-[3rem] space-y-3 py-10 flex-col bg-gray-200 shadow-md justify-center md:w-[40%] mt-[3rem] mx-auto"
      >
        <div className="flex flex-col">
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => {
              handleSetPost({ name: "title", value: e.target.value });
            }}
            name="price"
            id="price"
            className=" rounded-md border-gray-300 px-3 py-2  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter Title"
          />
          <p className="text-red-500">{error.title && error.title}</p>
        </div>
        <div className="flex flex-col">
          <label>Body</label>
          <textarea
            onChange={(e) => {
              handleSetPost({ name: "body", value: e.target.value });
            }}
            className=" rounded-md border-gray-300 px-3 py-2  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="add and item"
          ></textarea>
          <p className="text-red-500">{error.body && error.body}</p>
        </div>
        <button
          disabled={isPosting}
          className="bg-green-600 py-2.5 rounded-md text-white hover:bg-green-900"
        >
          {isPosting ? "Please Wait..." : "Add Post"}
        </button>
      </form>
      <div className="flex px-[1rem] space-y-3 py-10 flex-col bg-gray-200 shadow-md justify-center md:w-[80%] mt-[3rem] mx-auto">
        <Posts
          handleShowModal={handleShowModal}
          posts={posts}
          setPosts={setPosts}
        />
      </div>
    </div>
  );
};

export default Forms;
