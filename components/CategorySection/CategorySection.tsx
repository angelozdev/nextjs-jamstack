import { Heading, Pane } from "evergreen-ui";
import { CategoryCard } from "@components";

interface Props {
  categories: Category[];
}

function CategorySection({ categories }: Props) {
  return (
    <Pane>
      <Heading is="h3" size={600}>
        Categories
      </Heading>
      <Pane is="ul" padding="0" marginY=".5rem" listStyle="none">
        {categories.map(({ sys, title, icon }) => (
          <CategoryCard key={sys.id} title={title} image={icon} />
        ))}
      </Pane>
    </Pane>
  );
}

export default CategorySection;
