import "./style/App.css";
import MemoEditor from "./component/MemoEditor";
import MemoList from "./component/MemoList";
import { useCallback, useMemo, useRef, useState } from "react";

function App() {
  /* Data State */

  const [data, setData] = useState([]);
  const dataId = useRef(0);

  /* Create */

  const onCreate = useCallback((title, content, importance) => {
    const created_date = new Date().getTime();
    const newItem = {
      title,
      content,
      importance,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

  /* Remove */

  const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((it) => it.id !== targetId));
    // const newMemoList = data.filter((it) => it.id !== targetId);
    // setData(newMemoList);
  }, []);

  /* Edit */

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  /* Analysis */

  const getMemoAnalysis = useMemo(() => {
    const highCount = data.filter((it) => it.importance >= 3).length;
    const restCount = data.length - highCount;
    const ratio = (highCount / data.length) * 100;
    const highRatio = ratio.toFixed(2);
    return { highCount, restCount, highRatio };
  }, [data.length]);

  const { highCount, restCount, highRatio } = getMemoAnalysis;
  const [isAnToggle, setIsAnToggle] = useState(false);
  const handleAnToggle = () => setIsAnToggle(!isAnToggle);

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
