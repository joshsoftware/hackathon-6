import { Provider } from "react-redux";
import Approuter from "./router/AppRouter";
import { store } from "./api/store";

function App() {
  return (
    <Provider store={store}>
      <Approuter />
    </Provider>
  );
}

export default App;
