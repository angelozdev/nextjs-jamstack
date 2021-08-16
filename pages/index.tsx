import { Alert, Pane, Table } from "evergreen-ui";
import { EnvironmentVariables } from "@constants";

// types
import type { GetStaticProps } from "next";
interface Props {
  authors: { fullName: string; biography: string; id: string }[];
}

function Home({ authors }: Props) {
  return (
    <Pane is="section" paddingY="1rem">
      <Pane marginX="auto" paddingX="1rem" maxWidth="1028px">
        <Table>
          <Table.Head>
            <Table.TextHeaderCell flexBasis={200}>Name</Table.TextHeaderCell>
            <Table.TextHeaderCell flexGrow={1} flexBasis={600}>
              Biography
            </Table.TextHeaderCell>
          </Table.Head>

          <Table.Body>
            {authors.map(({ biography, fullName, id }) => (
              <Table.Row key={id}>
                <Table.TextCell flexBasis={200}>{fullName}</Table.TextCell>
                <Table.TextCell flexGrow={1} flexBasis={600}>
                  {biography}
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Pane>
    </Pane>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { contentful } = EnvironmentVariables;
  const URL = `https://graphql.contentful.com/content/v1/spaces/${contentful.SPACE_ID}`;
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${contentful.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `{
      authorCollection {
        total
        limit
        items {
          fullName
          biography
          sys {
            id
          }
        }
      }
    }
  `,
    }),
  };

  try {
    const response = await fetch(URL, options);
    const { data } = await response.json();

    const authors = data?.authorCollection?.items?.map((item: any) => {
      const {
        fullName,
        biography,
        sys: { id },
      } = item;
      return {
        fullName,
        biography,
        id,
      };
    });

    return {
      props: {
        authors,
      },
    };
  } catch (error) {
    return {
      props: {
        authors: [],
      },
    };
  }
};
export default Home;
