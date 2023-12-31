import { useContext } from "react";
import MemoItem from "./MemoItem";
import { MemoStateContext } from "../App";

const MemoList = () => {
  const memoList = useContext(MemoStateContext);

  return (
    <div className="MemoList">
      <h2>List</h2>
      <h4>{memoList.length} memo exists</h4>
      <div>
        {memoList.map((it) => (
          <MemoItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

// Props를 받아온 것이 없어 오류가 나는 것을 방지하는 defaultProps 기능.
MemoList.defaultProps = {
  memoList: [],
};

export default MemoList;
