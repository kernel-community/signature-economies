export default function Box({ title, content, includeBorder = true }) {
  return (
    <div className={"rounded-md overflow-hidden" + (includeBorder && " border border-gray-detail")}>
      <h2 className="font-mono py-3 bg-gray-wash text-gray-primary border-b border-gray-detail font-bold">{title}</h2>
      <div className="px-4 py-2 sm:px-8 text-gray-primary">{content}</div>
    </div> 
  );
};
