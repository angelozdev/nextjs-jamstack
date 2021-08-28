import { Heading, Pane } from "evergreen-ui";
import { CategoryCard } from "@components";
import { useTranslation } from "hooks";

interface Props {
  categories: Category[];
}

function CategorySection({ categories }: Props) {
  const { t } = useTranslation();
  return (
    <Pane>
      <Heading is="h3" size={600}>
        {t({ id: "categories.section.title" })}
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
