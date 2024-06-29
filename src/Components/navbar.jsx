import { NavLink } from 'react-router-dom'
function NavBar() {
    return (
        <nav className='container mx-auto flex justify-center my-5'>
            <ul className='flex flex-wrap justify-evenly w-full'>
                <li className='nav_bar'>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
                <li className='nav_bar'>
                    <NavLink to={"/about"}>About</NavLink>
                </li>
                <li className='nav_bar'>
                    <NavLink to={"/contact"}>Contact</NavLink>
                </li>
                <li className='nav_bar'>
                    <NavLink to={"/newreleased"}>New Released</NavLink>
                </li>
                <li className='nav_bar'>
                    <NavLink to={"/Books"}>Books</NavLink>
                </li>
            </ul>

        </nav>
    )
}
export default NavBar;