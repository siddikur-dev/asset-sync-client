const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12 md:py-16 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-gray-200 rounded-full"></div>
        <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-gray-600 text-sm md:text-base animate-pulse">Loading...</p>
    </div>
  );
};

export default Spinner;