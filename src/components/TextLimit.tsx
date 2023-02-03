import { FC, useState, LabelHTMLAttributes } from "react";

interface SidebarProps extends LabelHTMLAttributes<HTMLParagraphElement> {
  content: string;
  limit: number;
}

const TextLimit: FC<SidebarProps> = ({ content, limit }) => {
  const [showAll, setShowAll] = useState(false);

  const showMore = () => setShowAll(true);
  const showLess = () => setShowAll(false);

  if (content.length <= limit) {
    return <div>{content}</div>;
  }
  if (showAll) {
    return (
      <div>
        {content}
        {/* <button onClick={showLess} className="px-1 underline">
          Hide
        </button> */}
      </div>
    );
  }
  const toShow = content.substring(0, limit) + "...";
  return (
    <div>
      {toShow}
      {/* <button onClick={showMore} className="px-1 underline">
        Show All
      </button> */}
    </div>
  );
};

export default TextLimit;
