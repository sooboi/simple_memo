const MemoList = ({ memoList }) => {
  console.log(memoList);
  return (
    <div className="MemoList">
      <h2>Memo List</h2>
      <h4>{memoList.length} memo exists.</h4>
      <div>
        {memoList.map((it) => (
          // key가 없을 경우 map((it, idx) 식으로 인덱스를 이용하지만 추천하지 않는다. )
          <div key={it.id}>
            <div>Title : {it.title}</div>
            <div>Content : {it.content}</div>
            <div>Importance : {it.importance}</div>
            <div>Memo at : {it.create_date}</div>
          </div>
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
