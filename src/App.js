import Form from "./components/Form";
import Table from "./components/Tables";

import { useGlobalContext } from "./context/Context";
import ButtonList from "./components/ButtonList";

function App() {
  const { isLoading } = useGlobalContext();

  return (
    <>
      {!isLoading && <h2>Page is loading...</h2>}
      {isLoading && (
        <div className="section-center">
          <Form></Form>
          <Table />
          <ButtonList />
        </div>
      )}
    </>
  );
}

export default App;
