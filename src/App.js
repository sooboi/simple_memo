import "./style/App.css";
import MemoEditor from "./component/MemoEditor";
import MemoList from "./component/MemoList";
import { useRef, useState } from "react";

function App() {
  /* Data State */

  const [data, setData] = useState([]);
  const dateId = useRef(0);

  /* Create */

  const onCreate = (title, content, importance) => {
    const created_date = new Date().getTime();
    const newItem = {
      title,
      content,
      importance,
      created_date,
      id: dateId.current,
    };
    dateId.current += 1;
    setData([newItem, ...data]);
  };

  /* Remove */

  const onRemove = (targetId) => {
    const newMemoList = data.filter((it) => it.id !== targetId);
    setData(newMemoList);
  };

  /* Edit */

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <div className="Box">
        <MemoEditor onCreate={onCreate} />
        <MemoList memoList={data} onRemove={onRemove} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;
