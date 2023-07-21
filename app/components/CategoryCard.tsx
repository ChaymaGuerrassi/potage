import { IconType } from "react-icons";

interface CategoryCardProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-32 bg-ptgBeige rounded-lg shadow-md border-2 border-ptgGrey p-4 gap-4 cursor-pointer hover:bg-ptgBlue transition group ${
        selected && "bg-ptgBlue"
      }`}
      onClick={() => onClick(label)}
    >
      <Icon
        size={32}
        className={ `group-hover:text-ptgBeige transition ${
          selected ? "text-ptgBeige" : "text-ptgBlue"
        }`}
      />
      <p className="text-base text-center">{label}</p>
    </div>
  );
};

export default CategoryCard;
