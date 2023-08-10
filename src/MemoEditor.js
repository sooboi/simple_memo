import { useState, useRef } from "react";

const MemoEditor = () => {
  const [info, setInfo] = useState({
    title: "",
    content: "",
    importance: "2",
  });

  const titleInput = useRef();
  const contentInput = useRef();

  const handleChangeInfo = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
    console.log(info);
  };

  const handleSubmit = (e) => {
    if (info.title < 1) {
      titleInput.current.focus();
      return;
    }

    if (info.content < 5) {
      contentInput.current.focus();
      return;
    }

    alert("Memo Success !");
  };

  return (
    <div className="MemoEditor">
      <h2>Simple Memo</h2>
      <div>
        <input
          ref={titleInput}
          type="text"
          name="title"
          value={info.title}
          onChange={handleChangeInfo}
          placeholder="write down the title"
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={info.content}
          onChange={handleChangeInfo}
          placeholder="content . . ."
        ></textarea>
      </div>
      <div>
        <p> Choose the Importance</p>
        <br />
        <select
          name="importance"
          value={info.importance}
          onChange={handleChangeInfo}
        >
          <option value={1}>Low ⚡️</option>
          <option value={2}>Normal ⚡️⚡️</option>
          <option value={3}>High ⚡️⚡️⚡️</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default MemoEditor;
