import React, { useState } from "react";

const DivTextField = () => {
  const [text, setText] = useState("");
  const handleTextChange = (e) => {
    setText(e.target.innerHTML);
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData("text/plain"); // Get plain text
    document.execCommand("insertText", false, pastedText); // Insert plain text
  };
  return (
    <div
      className={`editable-div w-full mt-4 border-none outline-none text-sm ${
        text ? "filled" : ""
      } cursor-text`}
      data-placeholder="Bạn đang nghĩ gì?"
      contentEditable
      onInput={handleTextChange}
      onPaste={handlePaste}
    />
  );
};

export default DivTextField;
