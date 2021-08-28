import { Link, Pane } from "evergreen-ui";
import { Wrapper } from "@components";
import { courses } from "./fixtures";
import { useTranslation } from "hooks";

function Footer() {
  const { t } = useTranslation();
  return (
    <Pane is="footer" background="gray400">
      <Wrapper maxWidth="1280px">
        <Pane
          color="white"
          paddingY="2rem"
          display="flex"
          flexDirection="column"
          gap=".5rem"
        >
          {courses.map(({ href, id }, index) => (
            <Link
              key={index}
              color="neutral"
              size={300}
              target="_blank"
              href={href}
              display="block"
            >
              {t({ id })}
            </Link>
          ))}
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default Footer;
