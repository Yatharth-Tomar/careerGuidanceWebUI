import { useDispatch } from "react-redux";
import HomeLayout from "../../Layout/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import courseForm from "../../assets/Images/courseForm.jpg";
import toast from "react-hot-toast";
import { addCourse } from "../../assets/Redux/slices/courseSlice";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);
  const [userInput, setUserInput] = useState({
    title: " ",
    description: " ",
    category: "",
    createdBy: " ",
    thumbnail: " ",
  });

  //handlinf image input
  function getImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setUserInput({
        ...userInput,
        thumbnail: uploadedImage,
      });

      //filereader object
      const filereader = new FileReader();
      filereader.readAsDataURL(uploadedImage);
      filereader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  //createNew Course

  async function createNewCourse(e) {
    e.preventDefault();
    console.log("I am called");
    if (
      !userInput.category ||
      !userInput.title ||
      !userInput.createdBy ||
      !userInput.description ||
      !userInput.thumbnail
    ) {
      toast.error("Please fill all fields to proceed.");
      return;
    }

    //creating formdata object
    const formdata = new FormData();
    formdata.append("title", userInput.title);
    formdata.append("category", userInput.category);
    formdata.append("description", userInput.description);
    formdata.append("createdBy", userInput.createdBy);
    formdata.append("thumbnail", userInput.thumbnail);

    for (const [key, value] of formdata.entries()) {
      console.log(`${key}: ${value}`);
    }
    //dispatch action to createCourse
    const res = await dispatch(addCourse(formdata));
    if (res?.payload?.success) {
      navigate("/courses");
    }

    //resetting
    setUserInput({
      title: " ",
      description: " ",
      category: "",
      createdBy: " ",
      thumbnail: " ",
    });
  }
  return (
    <HomeLayout>
      <div className="bg-white p-6 border border-4 rounded-lg shadow relative m-10 flex">
        {/* Image Section */}
        <div className="w-1/2 h-full flex items-center justify-center p-5">
          <label htmlFor="thumbnail">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Product Image"
                className="w-full h-auto max-h-full object-cover rounded-lg"
              />
            ) : (
              <img
                src={courseForm}
                alt="Product Image"
                className="w-full h-auto max-h-full object-cover rounded-lg"
              />
            )}
          </label>
        </div>

        {/* Form Section */}
        <div className="w-1/2 p-5">
          <div className="flex items-start justify-between border-b pb-5">
            <h3 className="text-xl font-semibold">Create Course</h3>
          </div>

          <div className="p-6 space-y-6">
            <form method="POST" onSubmit={createNewCourse}>
              <div className="grid grid-cols-6 gap-6">
                <input
                  type="file"
                  onChange={getImage}
                  name="thumbnail"
                  id="thumbnail"
                  className="hidden"
                  required=""
                />
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    onChange={handleUserInput}
                    value={userInput.title}
                    name="title"
                    id="title"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    onChange={handleUserInput}
                    name="category"
                    value={userInput.category}
                    id="category"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="createdBy"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Creator Name
                  </label>
                  <input
                    type="text"
                    onChange={handleUserInput}
                    value={userInput.createdBy}
                    name="createdBy"
                    id="createdBy"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    required=""
                  />
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Course Description
                  </label>
                  <textarea
                    id="description"
                    onChange={handleUserInput}
                    name="description"
                    value={userInput.description}
                    rows="6"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  ></textarea>
                </div>
              </div>
              <div className="pt-[1rem] border-t border-gray-200 rounded-b">
                <button
                  className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  type="submit"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default CreateCourse;
