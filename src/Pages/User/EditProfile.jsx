import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layout/HomeLayout"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { handleEditAction } from "../../assets/Redux/slices/authSlice";

function EditProfile(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const _id=useSelector((state)=>state?.auth?.data?._id)

    const [previewImage,setPreviewImage]=useState(null);
    const [userInput,setUserInput]=useState({
        fullName:"",
        avatar:"",

    })
   
    function handleUserInput(e){
      
        const {name,value}=e.target;

        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    function getImage(e){
        e.preventDefault();
        const uploadedImage=e.target.files[0]
        if(uploadedImage){
            setUserInput({
                ...userInput,
                avatar:uploadedImage
            })
        }
        const fileReader=new FileReader();
        fileReader.readAsDataURL(uploadedImage)
        fileReader.addEventListener("load",function(){
            setPreviewImage(this.result)
        })
    }
    async function handleSubmit(e){
        e.preventDefault();
       
        if(!userInput.fullName && !userInput.avatar){
            toast.error("No single field updated !");
            return;
        }
        if(userInput.fullName){
            if(userInput.fullName.length<3){
                toast.error("Enter valid name, should be atleast 3 characters long")
                return;
            }
        }
        


        const formdata=new FormData();
        if(userInput.fullName){
            formdata.append("fullName",userInput.fullName)

        }
        if(userInput.avatar){
            formdata.append('avatar',userInput.avatar)
        }
        
        
        //dispatch
        const tempObject={
            formdata,
            _id
        }

        const response=await dispatch(handleEditAction(tempObject)) 
        
        if(response?.payload?.success){
            navigate("/user/profile")
        }
        //resetting

        setUserInput({
            fullName:"",
            avatar:""
        })
       
        
    }





    return (
        

        
       <>
        <HomeLayout>

        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
        Edit Profile
      </h2>
      <div className="flex justify-center">
        <label htmlFor="image_uploads" className="cursor-pointer">
          {previewImage ? (
            <img
              className="h-32 w-auto rounded-full"
              src={previewImage}
              alt="Profile Picture"
            
            />
          ) : (
            <img
              className="h-32 w-auto rounded-full"
              src="https://www.svgrepo.com/show/499664/user-happy.svg"
             
              alt="Profile Picture"
            />
          )}
        </label>
      </div>
    
     
      
     

      <form
        noValidate
        onSubmit={handleSubmit}
        className="space-y-6"
        method="POST"
      >

         <input
        type="file"
        id="image_uploads"
        accept=".jpg,.jpeg,.png,.svg"
        className="hidden"
        name="image_uploads"
        onChange={getImage}
      />
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <div className="mt-1">
            <input
              id="fullName"
              name="fullName"
              type="text"
            onChange={handleUserInput}
            value={userInput.fullName}
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
            Update Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


        </HomeLayout>

       </>
    )
}
export default EditProfile;