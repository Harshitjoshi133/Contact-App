import NavigationBar from "./components/NavigationBar";
import { CiSearch } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
export default function App() {
  return (
    <div className="px-4 max-w-[370px] mx-auto">
      <NavigationBar></NavigationBar>
      <div className="flex">
      <div className="flex flex-grow ml-1 relative items-center">
        <CiSearch className="absolute text-3xl text-white"/>
        <input type="text" className=" h-10 flex-grow 
        bg-transparent border pl-9 text-white border-white rounded-md" />
      </div>
     
        <FaPlusCircle className="text-white text-4xl ml-2 cursor-pointer" />

    
      </div>
    </div>
  )
}
