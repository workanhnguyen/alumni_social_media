import React, { useState } from "react";

import ReactQuill from "react-quill";

const CustomTextField = ({ content }) => {
  const [text, setText] = useState(content || '');
  
  return (
    <div className="mt-3">
      <ReactQuill
        theme="snow"
        value={text}
        onChange={setText}
        placeholder="Bạn đang nghĩ gì thế?"
      />
    </div>
  );
};

export default CustomTextField;
