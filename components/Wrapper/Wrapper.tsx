import { Pane } from "evergreen-ui";

// types
import { memo, PropsWithChildren } from "react";
interface Props {
  maxWidth: "1280px" | "1024px" | "768px" | "425px" | "600px";
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

export default memo(Wrapper);
