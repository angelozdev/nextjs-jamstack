import { Pane } from "evergreen-ui";
import { Wrapper } from "@components";

function Footer() {
  return (
    <Pane is="footer" background="dark">
      <Wrapper maxWidth="1280px">
        <Pane color="white" paddingY="2rem">
          Footer
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default Footer;
