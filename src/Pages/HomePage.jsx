import HomeLayout from "../Layout/HomeLayout";
import HomaPageImage from "../assets/Images/HomePageImage.png"
import { Link } from "react-router-dom";

function HomePage(){
    return (

       < HomeLayout>
            <div className="pt-10 p-10 text-black  flex items-center justify-cener gap-10 max-16 h-[90vh]  ">
                <div  className="w-1/2 pl-44 space-y-6 ">
                    <h1 className="text-5xl  font-semibold">
                        Find the Best  
                        <span className="text-yellow-500 ml-2 font-bold">
                            Career For You 
                        </span>
                    </h1>
                    <p className="text-xl text-gray-500 ">
                        Introducing our AI model that can help you find the best Career for you.
                    </p>
                    <div className="">
                        <Link to="/Explore Now">
                            <button className="bg-yellow-500 px-5 py-3 text-white rounded-md font-semibold text-l cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-100">Explore Now</button>

                        </Link>

                    </div>
                    



                </div>

                <div className="w-1/2 flex items-center justify-center">
                    <img className="w-2/3" src={HomaPageImage} />

                </div>




            </div>


       </HomeLayout>


    )
}

export default HomePage