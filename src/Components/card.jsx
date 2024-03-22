import { useNavigate } from "react-router-dom";

function Card({ data }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="flex  px-10 max-w-sm h-[25rem] py-3 m-[1.5rem] ml-[4rem] cursor-pointer"
        onClick={() => navigate("/courses/description", { state: { ...data } })}
      >
        <div className="max-w-sm rounded overflow-hidden  shadow-lg">
          <img
            className="w-full h-48 object-cover"
            src={data?.thumbnail?.secure_url}
            alt="Course Thumbnail"
          />
          <div className="px-6  py-4">
            <div className="font-bold text-l mb-2 line-clamp-2">
              {data?.title}
            </div>
          </div>
          <div className="px-6 pb-[2rem]">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm  mt-[10px] font-semibold text-gray-700 mr-2">
              {data?.category}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm mt-[10px] font-semibold text-gray-700 mr-2">
              {data?.createdBy}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm mt-[10px] font-semibold text-gray-700">
              {data?.numberOfLectures} lectures
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
