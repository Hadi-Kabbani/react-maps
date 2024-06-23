import { Link } from "react-router-dom"
function CartMiddle() {

    return (
        <div className="cartmiddle bg_linear flex justify-center items-center h-16">
            <Link className="mx-2 font-bold text-lg text-[#393280] hover:text-[#ed553b]" to={"/"}>Home<span className="ml-4">/</span></Link>
            <Link className="mx-2 font-bold text-lg text-primary hover:text-secondary" to={"/cart"}>Cart<span className="ml-4"></span></Link>
        </div>
    )

}

export default CartMiddle