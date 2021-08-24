import { Pane } from "evergreen-ui";
import { AuthorCard } from "@components";

interface Props {
  authors: Author[];
}

function AuthorList({ authors }: Props) {
  return (
    <Pane
      is="ul"
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))"
      paddingY="2rem"
      listStyle="none"
      padding="0"
      gap="1rem"
      justifyContent="center"
    >
      {authors.map(({ fullName, photo, handle }) => (
        <AuthorCard
          key={handle}
          fullName={fullName}
          photo={photo}
          handle={handle}
        />
      ))}
    </Pane>
  );
}

export default AuthorList;
