import NextLink from "next/link";
import { Routes } from "@constants";
import { Heading, TreeIcon, Pane, Link } from "evergreen-ui";
import { Wrapper } from "@components";

function Header() {
  return (
    <Pane is="header" elevation={1}>
      <Wrapper maxWidth="1280px">
        <Pane paddingY=".5rem">
          <NextLink href={Routes.HOME}>
            <Link paddingY="1rem" display="inline-block" cursor="pointer">
              <Heading is="h1" display="flex" gap=".5rem">
                <TreeIcon color="green500" />
                Treepedia
              </Heading>
            </Link>
          </NextLink>
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default Header;
