import React, { useState } from 'react'

const Modal = ({setOpened, singlePost}) => {
  const [post, setPost] = useState({
    userId: 50,
  });
  const [posts, setPosts] = useState();
  const [error, setError] = useState({});
  const [isPosting, setPosting] = useState(false);


  const handleUpdatePost = () => {

  }

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
  return (
    <div className='pt-[10rem] h-full'>
      <form
        onSubmit={handleUpdatePost}
        className="flex px-[3rem] space-y-3 py-10 flex-col bg-gray-200 shadow-md justify-center md:w-[40%] mt-[3rem] mx-auto"
      >
        <div className='flex justify-between items-center'>
        <h3 className=''>Update Post</h3>
        <span onClick={() => {
          setOpened(prev => !prev)
        }} className='text-red-600 cursor-pointer text-3xl'>&times;</span>
      </div>
        <div className="flex flex-col">
          <label>Title</label>
          <input
            type="text"
            value={singlePost.title}
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
          value={singlePost.body}
            onChange={(e) => {
              handleSetPost({ name: "body", value: e.target.value });
            }}
            className="h-[8rem] rounded-md border-gray-300 px-3 py-2  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="add and item"
          ></textarea>
          <p className="text-red-500">{error.body && error.body}</p>
        </div>
        <button
          disabled={isPosting}
          className="bg-green-600 py-2.5 rounded-md text-white hover:bg-green-900"
        >
          {isPosting ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  )
}

export default Modal;