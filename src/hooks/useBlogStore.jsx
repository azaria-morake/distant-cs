import React, { createContext, useContext, useState } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [activePost, setActivePost] = useState(null);

  return (
    <BlogContext.Provider value={{ activePost, setActivePost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogStore = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogStore must be used within a BlogProvider');
  }
  return context;
};
