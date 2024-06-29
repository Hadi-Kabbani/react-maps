import { Link } from "react-router-dom";
function AboutMiddle() {
    return (
        <div className="flex justify-center items-center h-16 bg-gradient-to-r from-[#ffe6e6]  to-#f5fffe mt-1">
            <Link className="mx-2 font-bold text-lg text-[#393280] hover:text-[#ed553b]" to={"/"}>Home<span className="ml-4">/</span></Link>
            <Link className="mx-2 font-bold text-lg text-[#393280] hover:text-[#ed553b]" to={"/about"}>About</Link>
        </div >
    )
}

export default AboutMiddle;