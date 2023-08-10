const MemoItem = ({ title, content, importance, id, create_date }) => {
  const importanceChanger = (i) => {
    if (i == 3) {
      return "⚡️⚡️⚡️";
    } else if (i == 2) {
      return "⚡️⚡️";
    } else {
      return "⚡️";
    }
  };

  return (
    <div className="MemoItem">
      <div className="info">
        <div className="title">
          {title} {importanceChanger(importance)}
        </div>
        <p />
        <div className="date">{new Date(create_date).toLocaleString()}</div>
        <div className="content">{content}</div>
      </div>
    </div>
  );
};

export default MemoItem;
