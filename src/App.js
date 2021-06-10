import Form from "./components/Form";
import Table from "./components/Tables";

import { useGlobalContext } from "./context/Context";
import ButtonList from "./components/ButtonList";

function App() {
  const { isLoading, pagination } = useGlobalContext();
  let pages = 0;
  if (isLoading) {
    pages = Object.keys(pagination).length;
    console.log(`pages`, pages);
  }

  return (
    <>
      {!isLoading && <h2>Page is loading...</h2>}
      {isLoading && (
        <div className="section-center">
          <Form></Form>
          {pages === 0 && (
            <h3 className="empty-list">No Users to list down...</h3>
          )}
          {pages > 0 && <Table />}
          {pages > 0 && <ButtonList />}
        </div>
      )}
    </>
  );
}

export default App;
