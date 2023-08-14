import "./style/App.css";
import MemoEditor from "./component/MemoEditor";
import MemoList from "./component/MemoList";
import React, {
  useCallback,
  useMemo,
  useReducer,
  useState,
  useRef,
} from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

export const MemoStateContext = React.createContext();
export const MemoDispatchContext = React.createContext();

function App() {
  /* Data State */

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  /* Create */

  const onCreate = useCallback((title, content, importance) => {
    dispatch({
      type: "CREATE",
      data: { title, content, importance, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  /* Remove */

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  /* Edit */

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
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
    <MemoStateContext.Provider value={data}>
      <MemoDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <div className="Box">
            <MemoEditor />
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

            <MemoList />
          </div>
        </div>
      </MemoDispatchContext.Provider>
    </MemoStateContext.Provider>
  );
}

export default App;
