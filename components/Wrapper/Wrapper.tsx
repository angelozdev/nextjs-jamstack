import { Pane } from "evergreen-ui";

// types
import type { PropsWithChildren } from "react";
interface Props {
  maxWidth: "1280px" | "1024px" | "768px";
  hasPadding?: boolean;
}

function Wrapper({
  maxWidth,
  children,
  hasPadding = true,
}: PropsWithChildren<Props>) {
  return (
    <Pane
      maxWidth={maxWidth}
      marginX="auto"
      paddingX={hasPadding ? "1rem" : ""}
    >
      {children}
    </Pane>
  );
}

export default Wrapper;
