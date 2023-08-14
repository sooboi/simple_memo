import { useRef, useState } from "react";

const MemoItem = ({
  onRemove,
  onEdit,
  title,
  content,
  importance,
  id,
  created_date,
}) => {
  /* Importance Change */

  const importanceChanger = (i) => {
    if (i >= 3) {
      return "⚡️⚡️⚡️";
    } else if (i === 2) {
      return "⚡️⚡️";
    } else {
      return "⚡️";
    }
  };

  /* Remove */

  const handleRemove = () => {
    if (window.confirm(`Delete the ${id}th memo ? `)) {
      onRemove(id);
    }
  };

  /* Edit */

  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`Correct ${id}th memo ?`)) {
      onEdit(id, localContent);
      toggleEdit();
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
        <div className="content">
          {isEdit ? (
            <>
              <textarea
                ref={localContentInput}
                value={localContent}
                onChange={(e) => {
                  setLocalContent(e.target.value);
                }}
              />
            </>
          ) : (
            <>{content}</>
          )}
        </div>
        <div className="btnBox">
          {isEdit ? (
            <>
              <button className="cancelBtn" onClick={handleQuitEdit}>
                Cancel
              </button>
              <button className="submitBtn" onClick={handleEdit}>
                Submit
              </button>
            </>
          ) : (
            <>
              <button className="delBtn" onClick={handleRemove}>
                Del
              </button>
              <button className="editBtn" onClick={toggleEdit}>
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoItem;
