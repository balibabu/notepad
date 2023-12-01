import { GlobalVarProvider } from "./GlobalVariables";
import Note from "./components/Note";
import NotesList from "./components/NotesList";

function App() {
  let note = { title: "Take Note", description: "", color: "#96ffff" };
  return (
    <GlobalVarProvider>
      <NotesList />
    </GlobalVarProvider>
  );
}

export default App;

