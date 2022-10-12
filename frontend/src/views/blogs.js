import { NavLink } from "react-router-dom";

export default function Blogs({blogs}) {
    blogs = blogs[0]; //why?
    const nonspecialblogs = blogs.filter(blog => {return blog.special === false;});
    const li_blogs = nonspecialblogs.map((blog) => {
        const blog_to = "/" + blog.id;
        return (
            <section className="preview" key={blog.id}>
                <h3>{blog.title}</h3>
                <p>{blog.content_text.substring(0, 100)} ...</p>
                <NavLink className="link" to={blog_to}>Read more</NavLink>
            </section>
        );
    });

    return (<>{li_blogs}</>);
}