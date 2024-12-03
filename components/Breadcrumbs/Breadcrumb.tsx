interface BreadcrumbProps {
  pageName: string;
  index?: string;
}
const Breadcrumb = ({ pageName, index }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {index === undefined ? (
        <>
          <h2 className="text-5xl font-semibold text-black dark:text-white">
            {pageName}
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-5xl font-semibold text-black dark:text-white">
            {index}
          </h2>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
