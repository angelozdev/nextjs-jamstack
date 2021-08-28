import { Heading, Pane } from "evergreen-ui";
import { useTranslation } from "next-i18next";
import { CategoryCard } from "@components";

interface Props {
  categories: Category[];
}

function CategorySection({ categories }: Props) {
  const { t } = useTranslation("category-section");
  return (
    <Pane>
      <Heading is="h3" size={600}>
        {t("title")}
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
