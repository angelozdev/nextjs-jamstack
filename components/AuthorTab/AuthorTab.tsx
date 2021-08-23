import { Tab } from "evergreen-ui";
import { useRouter } from "next/router";

interface Props {
  handle: Author["handle"];
  fullName: Author["fullName"];
  onSelect: (handle: Author["handle"]) => void;
  currentAuthor: Author["handle"];
}

function AuthorTab({ handle, fullName, onSelect, currentAuthor }: Props) {
  return (
    <Tab
      key={handle}
      id={handle}
      onSelect={() => onSelect(handle)}
      isSelected={handle === currentAuthor}
      aria-controls={`panel-${handle}`}
      display="block"
      marginBottom=".5rem"
      textTransform="uppercase"
    >
      {fullName}
    </Tab>
  );
}

export default AuthorTab;
