import { Switch, Route, Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import TextEditor from "./components/TextEditor";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={`/documents/${uuidv4()}`} />
      </Route>
      <Route path="/documents/:id" component={TextEditor} />
    </Switch>
  );
}

export default App;
