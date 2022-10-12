import { NavLink } from "react-router-dom";

export default function Categories({categories, blogs, logout}) {
    const send = () => {
        logout();
    }

    categories = categories[0]; //why?
    blogs = blogs[0]; //why?
    const categoryBlogs = categories.map((c) => {
        return [c.id, c.name, blogs.filter(blog => {return blog.category_id === c.id;})]
    })
    
    const li_categories = categoryBlogs.map((cat) => {
        return (
            <li key={cat[0]}><a href="#">{cat[1]}</a>
                <ul className="dropdown" aria-label="submenu">
                    {cat[2].map((b, index) => <li key={index}><NavLink className="link" to={"/"+b.id}>{b.title.substring(0, 15)} ...</NavLink></li>)}
                </ul>
            </li>
        );
    });

    let adminmenu = null;

    if (localStorage.getItem("token") === null) {
        adminmenu = <li><a href="#">Admin</a>
            <ul className="dropdown" aria-label="submenu">
                <li><NavLink className="link" to={"/login"}>Login</NavLink></li>
            </ul>
        </li>
    } else {
        adminmenu = <li><a href="#">Admin</a>
            <ul className="dropdown" aria-label="submenu">
                <li><NavLink className="link" to={"/blog"}>New blog</NavLink></li>
                <li><NavLink className="link" onClick={send}>Logout</NavLink></li>
            </ul>
        </li>
    }

    return (
        <ul>
            <li><NavLink className="link" to={"/"}>Home</NavLink></li>
            {li_categories}
            {adminmenu}
        </ul>);
}