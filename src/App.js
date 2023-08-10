import "./style/App.css";
import MemoEditor from "./component/MemoEditor";
import MemoList from "./component/MemoList";
import { useRef, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const dateId = useRef(0);

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

  const onDelete = (targetId) => {
    const newMemoList = data.filter((it) => it.id !== targetId);
    setData(newMemoList);
  };

  return (
    <div className="App">
      <div className="Box">
        <MemoEditor onCreate={onCreate} />
        <MemoList memoList={data} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default App;
