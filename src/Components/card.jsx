import { useNavigate } from "react-router-dom";

function Card({ data }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="flex px-3 max-w-80 py-3 cursor-pointer"
        onClick={() => navigate("/courses/description", { state: { ...data } })}
      >
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src={data?.thumbnail?.secure_url}
            alt="Course Thumbnail"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{data?.title}</div>
            <p className="text-gray-700 text-base">{data?.description}</p>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {data?.category}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 my-2 py-1 text-sm font-semibold text-gray-700 mr-2">
              {data?.createdBy}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {data?.numberOfLectures}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
