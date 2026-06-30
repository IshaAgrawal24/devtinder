import Approuter from "./routes/Approuter";
import {Provider} from "react-redux";
import appStore from "./store/appStore";

function App() {
  return (
  <Provider store={appStore}>
      <Approuter />
    </Provider>
  )
}

export default App
