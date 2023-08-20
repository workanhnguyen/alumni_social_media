import React, { useState } from "react";

import ReactQuill from "react-quill";

const CustomTextField = () => {
  const [text, setText] = useState("");
  
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
