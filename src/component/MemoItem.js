const MemoItem = ({
  onDelete,
  title,
  content,
  importance,
  id,
  created_date,
}) => {
  const importanceChanger = (i) => {
    if (i === 3) {
      return "⚡️⚡️⚡️";
    } else if (i === 2) {
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
        <div className="date">{new Date(created_date).toLocaleString()}</div>
        <div className="content">{content}</div>
        <button
          className="delBtn"
          onClick={() => {
            if (window.confirm(`Delete the ${id}th memo ? `)) {
              onDelete(id);
            }
          }}
        >
          Del
        </button>
      </div>
    </div>
  );
};

export default MemoItem;
