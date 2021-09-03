import { Tab } from "evergreen-ui";
import NextLink from "next/link";

import { Routes } from "@utils/constants";

interface Props {
  handle: Author["handle"];
  fullName: Author["fullName"];
  currentAuthor: Author["handle"];
}

function AuthorTab({ handle, fullName, currentAuthor }: Props) {
  return (
    <NextLink
      href={{
        pathname: Routes.TOP_STORIES,
        query: { handle },
      }}
      passHref
      shallow
    >
      <Tab
        is="a"
        id={handle}
        isSelected={handle === currentAuthor}
        display="block"
        marginBottom=".5rem"
        textTransform="uppercase"
      >
        {fullName}
      </Tab>
    </NextLink>
  );
}

export default AuthorTab;
