import React from 'react';

const PostLayout2 = ({ title, children }) => {
  return (
    <>
      <body className="bg-white">
        {children}
      </body>
    </>
  );
};

export default PostLayout2;
