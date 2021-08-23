interface Props {
  authors: Author[];
  currentAuthor: string;
}

function Authors({ currentAuthor, authors }: Props) {
  return (
    <div>
      {authors.map(({ fullName, handle }) => (
        <p key={handle}>
          {fullName}
          {currentAuthor === handle ? " - (current)" : ""}
        </p>
      ))}
    </div>
  );
}

export default Authors;
