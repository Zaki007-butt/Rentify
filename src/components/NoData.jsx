import searchSvg from "../assets/search-illustration.svg";

function NoData() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[50vh]">
      <img src={searchSvg} width={200} className="opacity-40" />
      <h2 className="text-gray-500 text-xl">No Data</h2>
    </div>
  );
}

export default NoData;
