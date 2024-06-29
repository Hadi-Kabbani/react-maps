import { Link } from "react-router-dom";

function SingleBookHeader({ title, id }) {
    return (
        <div className="flex justify-center overflow-hidden items-center h-16 bg-gradient-to-r from-[#ffe6e6]  to-#f5fffe mt-1">
            <Link className="mx-2 font-bold text-lg text-[#393280] hover:text-[#ed553b]" to={"/"}>Home<span className="ml-4">/</span></Link>
            <Link className="mx-2 font-bold text-lg text-primary hover:text-secondary" to={"/books"}>Books<span className="ml-4">/</span></Link>
            <Link className="mx-2 font-bold text-lg text-primary hover:text-secondary" to={`/books/${id}`}>{title}</Link>
        </div>
    );
}

export default SingleBookHeader;
