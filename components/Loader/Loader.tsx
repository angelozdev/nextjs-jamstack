import { Pane, Spinner, PaneProps } from "evergreen-ui";

interface Props extends PaneProps {}

function Loader(props: Props) {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="30vh"
      gap="1rem"
      flexDirection="column"
      {...props}
    >
      <Spinner />
      <span>Loading...</span>
    </Pane>
  );
}

export default Loader;
