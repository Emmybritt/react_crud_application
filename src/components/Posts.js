import React, { useEffect, useState } from "react";

const Posts = ({ posts, setPosts, handleShowModal }) => {
  // const [fetchedPosts, setFetchedPost] = useState([]);
  console.log();
  let fetchedPosts = [];

  // function IteratePost() {
  //   if (posts) {
  //     for(let i = 0; i < 10; i++){
  //     fetchedPosts.push(posts[i])
  //     }
  //     return fetchedPosts;
  //   }
  // }

  // console.log('This is the fetched poost', IteratePost());

  function handleDeletePost(id) {
    if (window.confirm("Are You Sure want to continue this process")) {
      let iteratedPost = posts.filter((item) => item.id !== id);
      setPosts(iteratedPost);
    }
  }

  return (
    <div>
      {posts &&
        posts.map((item, i) => {
          return (
            <div key={i} className="bg-white p-3 m-2">
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-bold uppercase">{item.title}</h3>
                <div className="space-x-3">
                  <span
                    onClick={() => {
                      handleDeletePost(item.id);
                    }}
                    className="text-green-600 text-xs cursor-pointer"
                  >
                    &#128465;
                  </span>
                  <span onClick={() => {
                    handleShowModal(item.id)
                  }} className="text-green-600 cursor-pointer">&#9998;</span>
                </div>
              </div>
              <p>{item.body}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
