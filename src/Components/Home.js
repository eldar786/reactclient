import React, { useEffect, useState } from "react";

function Home() {

  let mail = localStorage.getItem("storedEmail").replace(/"/g, "");

    //store all the posts from the server in JavaScript array
  const [posts, setPosts] = useState([]);

  function getPosts() {
    const url = 'https://localhost:7010/get-all-posts';

    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
      .then(postsFromServer => {
        console.log(postsFromServer);
        setPosts(postsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
      console.log("Interval of 10 seconds");
  }


   // Periodic data fetch with a refresh interval of 10 seconds
   useEffect(() => {
    let timerId = setInterval(() => {
    getPosts();
   }, 10000);
    
   return () => {
    clearInterval(timerId);
   };
  },[]);

  return (
    <>
      <h1>Login Successfully {mail}</h1>

      <div className="container">
       <div className="row min-vh-100">
         <div className="col d-flex flex-column justify-content-center align-items-center">
           <div>
             <h1>ASP.NET Core React Telus International</h1>

             <div className="mt-5">
               <button onClick={getPosts} className="btn btn-dark btn-lg w-100">Get data from server</button>
             </div>
           </div>

           {renderPostsTable()}
         </div>
       </div>
     </div>
    </>
  );

    function renderPostsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Queue_Group_Name</th>
              <th scope="col">Offered</th>
              <th scope="col">Handled</th>
              <th scope="col">ATT</th>
              <th scope="col">AHT</th>
              <th scope="col">ServiceLevel</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.queue_Group_Name}</td>
                <td>{post.offered}</td>
                <td>{post.handled}</td>
                <td>{post.att}</td> 
                <td>{post.aht}</td>
                <td>{post.serviceLevel} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;
