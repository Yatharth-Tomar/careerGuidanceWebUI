import { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createAccount } from "../assets/Redux/slices/authSlice";

function Signup() {
  const [previewImage, setPreviewImage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: "",
  });
  //getting data from form
  function handleUserInput(e) {
   
    const { name, value } = e.target;
    
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  //function to get image data
  function getImage(event) {
    event.preventDefault();
    const uploadImage = event.target.files[0];
    if (uploadImage) {
      setSignupData({ ...signupData, avatar: uploadImage });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }
  //function to handle form submission
  //flow is first field data authentication -> convert them into form data -> dispatch action using formdata->if got response from backend application navigate back to home page
  async function createNewAccount(e) {
    e.preventDefault();
    if (
      !signupData.fullname ||
      !signupData.password ||
      !signupData.email ||
      !signupData.avatar
    ) {
      toast.error("Please Fill all the details ");
      return;
    } else if (signupData.fullname.length < 3) {
      toast.error("Name should be atleast of 3 alphabets, Enter a valid name");
      return;
    } else if (signupData.password.length < 5) {
      toast.error("password should be atleast of 5 length");
      return;
    } else if (
      !signupData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Enter valid email");
      return;
    }

    //creating formdata object
    const formdata = new FormData();
    formdata.append("fullName", signupData.fullname);
    formdata.append("password", signupData.password);
    formdata.append("avatar", signupData.avatar);
    formdata.append("email", signupData.email);
 

    //dispatch the action
    const response = await dispatch(createAccount(formdata));
    if (response?.payload?.success) {
      navigate("/");
    }

    //reset signup data
    setSignupData({ fullname: "", password: " ", email: " ", avatar: " " });
    setPreviewImage(" ");
  }

  return (
    <HomeLayout>
      <>
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="bg-white shadow-md rounded-md p-6">
              <label htmlFor="image_uploads">
                {previewImage ? (
                  <img
                    className="mx-auto cursor-pointer h-12 w-auto"
                    src={previewImage}
                    alt=""
                  />
                ) : (
                  <img
                    className="mx-auto cursor-pointer h-12 w-auto"
                    src="https://www.svgrepo.com/show/499664/user-happy.svg"
                    alt=""
                  />
                )}
              </label>
              <input
                type="file"
                onChange={getImage}
                id="image_uploads"
                accept=".jpg,.jpeg,.png,.svg"
                className="hidden"
                name="image_uploads"
              />

              {/* <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" /> */}

              <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign up for an account
              </h2>

              <form
                noValidate
                onSubmit={createNewAccount}
                className="space-y-6"
                method="POST"
              >
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleUserInput}
                      name="fullname"
                      type="username"
                      value={signupData.fullname}
                      required
                      className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      name="email"
                      type="email-address"
                      autoComplete="email-address"
                      required
                      value={signupData.email}
                      onChange={handleUserInput}
                      className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      name="password"
                      type="password"
                      value={signupData.password}
                      autoComplete="password"
                      onChange={handleUserInput}
                      required
                      className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                  >
                    Register Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </HomeLayout>
  );
}

export default Signup;
