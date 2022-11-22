import CategoryCard from "../category-card/CategoryCard";
import "./CategoriesList.styles.scss";

const CategoriesList = ({categories}) => {

  return (
    <div className="categories-container">
      {categories.map((category, index) => {
        return <CategoryCard key={index} category={category} />;
      })}
    </div>
  );
};

export default CategoriesList;
