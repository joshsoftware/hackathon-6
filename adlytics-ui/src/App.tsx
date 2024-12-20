import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Approuter from "./router/AppRouter";


function App() {
  const queryclient = new QueryClient();
  return (
    <QueryClientProvider client={queryclient}>
      <Approuter />
    </QueryClientProvider>
  );
}

export default App;
