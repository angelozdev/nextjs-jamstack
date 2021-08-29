import { Pane, Spinner } from "evergreen-ui";

function Loader() {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="30vh"
      gap="1rem"
      flexDirection="column"
    >
      <Spinner />
      <span>Loading...</span>
    </Pane>
  );
}

export default Loader;
