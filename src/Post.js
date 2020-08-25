import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar"
const Post = ({userName, imageUrl, caption}) => {
  return (
    <div className="post">
        <div className="post__header">
            <Avatar
            className="post__avatar"
            alt={userName}
            src="https://www.w3schools.com/w3images/avatar6.png"/>
            <h5>{userName}</h5>
        </div>
      
      <img
        className="post__image"
        src={imageUrl}
        alt=""
      />
      <h4 className="post__text"><strong>{userName}</strong> {caption}</h4>
      {/* header -> avatar and name */}
      {/* image */}
      {/* username and caption */}
    </div>
  );
};

export default Post;
