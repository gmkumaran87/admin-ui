import Form from "./components/Form";
import Table from "./components/Tables";

import { useGlobalContext } from "./context/Context";
import ButtonList from "./components/ButtonList";

function App() {
  const { isLoading, pagination, isError, errorMsg } = useGlobalContext();
  let content = "";
  let pages = 0;

  if (isLoading) {
    pages = Object.keys(pagination).length;

    // If no error from the API then check if array is empty because of searching invalid users or no
    // values return then display below msg Else load the table contents.
    if (pages === 0) {
      content = <h3 className="empty-list">No Users to list down...</h3>;
    } else {
      content = "";
    }
  }

  // If the API return error, then display ERROR Msg
  if (isError) {
    content = <h3 className="empty-list"> {errorMsg} </h3>;
  }
  // If the API is loading and no ERROR, then display below Msg
  if (!isLoading && !isError) {
    content = <h2 className="empty-list">Page is loading...</h2>;
  }

  return (
    <>
      <div className="section-center">
        <Form></Form>
        {content}
        {!content && <Table />}
        {!content && <ButtonList />}
      </div>
    </>
  );
}

export default App;
