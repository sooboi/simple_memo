import "./style/App.css";
import MemoEditor from "./component/MemoEditor";
import MemoList from "./component/MemoList";
import { useMemo, useRef, useState } from "react";

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

  const getMemoAnalysis = useMemo(() => {
    const highCount = data.filter((it) => it.importance >= 3).length;
    const restCount = data.length - highCount;
    const ratio = (highCount / data.length) * 100;
    const highRatio = ratio.toFixed(3);
    return { highCount, restCount, highRatio };
  }, [data.length]);

  const { highCount, restCount, highRatio } = getMemoAnalysis;

  const [isAnToggle, setIsAnToggle] = useState(false);

  const handleAnToggle = () => setIsAnToggle(!isAnToggle);

  console.log("git add 용 * 추후 삭제");

  return (
    <div className="App">
      <div className="Box">
        <MemoEditor onCreate={onCreate} />
        <button className="AnBtn" onClick={handleAnToggle}>
          Analysis
        </button>
        {isAnToggle ? (
          <>
            <div className="MemoStatus">
              <div>All Memo : {data.length}</div>
              <div>High Importance : {highCount}</div>
              <div>Rest Importance : {restCount}</div>
              <div>High Memo Ratio : {highRatio}%</div>
            </div>
          </>
        ) : (
          <></>
        )}

        <MemoList memoList={data} onRemove={onRemove} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;
