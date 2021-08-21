import { ListItem, OrderedList, Pane, Paragraph } from "evergreen-ui";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { BLOCKS } from "@contentful/rich-text-types";

// types
import type { PaneProps } from "evergreen-ui";
import type { Document } from "@contentful/rich-text-types";
import type { Options } from "@contentful/rich-text-react-renderer";
interface Props extends PaneProps {
  document: Document;
}

const options: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: function ContenfulParagraph(_, children) {
      return (
        <Paragraph marginBottom=".75rem" color="inherit">
          {children}
        </Paragraph>
      );
    },

    [BLOCKS.UL_LIST]: function ContenfulUlList(_, children) {
      return <OrderedList color="inherit">{children}</OrderedList>;
    },

    [BLOCKS.LIST_ITEM]: function ContenfulListItem(_, children) {
      return <ListItem color="inherit">{children}</ListItem>;
    },
  },
};

function RichText({ document, ...rest }: Props) {
  return (
    <Pane color="gray" marginY="1rem" {...rest}>
      {documentToReactComponents(document, options)}
    </Pane>
  );
}

export default RichText;
