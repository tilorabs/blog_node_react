import { useParams } from "react-router-dom";

export default function Blogdetail({blogs}) {
    const {id} = useParams();
    const blogsWithId = blogs.filter(b => {return b.id == id;});
    const blog = blogsWithId[0];
    const bdate = new Date(blog.date_time).toLocaleDateString();
    return (
        <section className="preview" key={blog.id}>
            <h3>{blog.title}</h3>
            <p className="small">from {bdate} by {blog.author_name}</p>
            <p>{blog.content_text}</p>
            <img src={blog.picture} alt={blog.title}/>
        </section>
    );
}