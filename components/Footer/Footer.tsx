import { Link, Pane } from "evergreen-ui";
import { Wrapper } from "@components";

function Footer() {
  return (
    <Pane is="footer" background="gray400">
      <Wrapper maxWidth="1280px">
        <Pane color="white" paddingY="2rem">
          <Link
            color="neutral"
            size={500}
            target="_target"
            href="https://platzi.com/clases/nextjs-jamstack/"
          >
            Curso de Next.js: Sitios Estáticos y Jamstack
          </Link>
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default Footer;
