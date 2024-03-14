import { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loginAction } from "../assets/Redux/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  //getting data from form
  function handleUserInput(e) {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  //function to handle form submission
  //flow is first field data authentication -> convert them into form data -> dispatch action using formdata->if got response from backend application navigate back to home page
  async function handleLogin(e) {
    e.preventDefault();
    if (!loginData.password || !loginData.email) {
      toast.error("Please Fill all the details ");
      return;
    }

    //dispatch the action
    const response = await dispatch(loginAction(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }

    //reset signup data
    setLoginData({ password: " ", email: " " });
  }

  return (
    <HomeLayout>
      <>
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="bg-white shadow-md rounded-md p-6">
              <label htmlFor="image_uploads">
                <img
                  className="mx-auto cursor-pointer h-12 w-auto"
                  src="https://www.svgrepo.com/show/499664/user-happy.svg"
                  alt=""
                />
              </label>

              {/* <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" /> */}

              <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                Login
              </h2>

              <form
                noValidate
                onSubmit={handleLogin}
                className="space-y-6"
                method="POST"
              >
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
                      value={loginData.email}
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
                      value={loginData.password}
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
                    Login
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

export default Login;
