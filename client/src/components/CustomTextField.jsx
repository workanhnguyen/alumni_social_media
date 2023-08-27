import React from "react";

import ReactQuill from "react-quill";

const CustomTextField = ({ content, setContent }) => {
  
  return (
    <div className="max-h-40 mt-3 overflow-auto">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Bạn đang nghĩ gì thế?"
      />
    </div>
  );
};

export default CustomTextField;
