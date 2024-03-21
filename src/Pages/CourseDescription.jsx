import { useLocation } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";

function CourseDesciption() {
  const { state } = useLocation();
  console.log(state);

  return (
    <HomeLayout>
      <div className="bg-gray-100 pt-[8rem] dark:bg-gray-800 h-[100vh] ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[300px] w-[300px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={state.thumbnail.secure_url}
                  alt="Product Image"
                />
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {" "}
                {state.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4"></p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    $29.99
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Course Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {state.description}
                </p>
                <div className="font-bold text-gray-700 mt-4 dark:text-gray-300">
                  No of Lectures : {state.numberOfLectures}
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <button className="w-full lg:mt-[4rem] bg-gray-900 dark:bg-gray-600 text-white text-left py-2 px-4 rounded-semi font-bold hover:bg-gray-800 dark:hover:bg-gray-700 sm:mt-[1rem]">
                      Subscribe
                    </button>
                  </div>
                  <div className="w-1/2 px-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default CourseDesciption;
