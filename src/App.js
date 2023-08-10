import "./App.css";
import MemoEditor from "./MemoEditor";
import MemoList from "./MemoList";

const dummyList = [
  {
    id: 1,
    title: "eat meal",
    content: "please eat some please",
    importance: "2",
    create_date: new Date().getTime(),
  },
  {
    id: 2,
    title: "health",
    content: "please use ur body",
    importance: "1",
    create_date: new Date().getTime(),
  },
  {
    id: 3,
    title: "studying",
    content: "don't give up",
    importance: "3",
    create_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <div className="Box-wrapper">
        <MemoEditor />
        <MemoList memoList={dummyList} />
      </div>
    </div>
  );
}

export default App;
