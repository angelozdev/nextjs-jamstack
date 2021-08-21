import { Wrapper } from "@components";
import { Pane } from "evergreen-ui";

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
