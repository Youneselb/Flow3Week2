import "./App.css";
import BasicExample from "./example";
import bookFacade from "./bookFacade.js";

function App(props) {
  return (
    <div>
      <BasicExample bookFacade={props.bookFacade} />
      <addBook />
    </div>
  );
}

export default App;
