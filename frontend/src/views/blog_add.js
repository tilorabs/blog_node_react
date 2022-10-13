import {useState} from 'react';

export default function BlogNew({addBlog, categories}) {
    const [new_title, setNewTitle] = useState('');
    const [new_date_time, setNewDate_time] = useState('');
    const [new_author_name, setNewAuthor_name] = useState('');
    const [new_content_text, setNewContent_text] = useState('');
    const [new_picture, setNewPicture] = useState('');
    const [new_special, setNewSpecial] = useState('');
    const [new_category_id, setNewCategory_id] = useState(1);

    function handleAddBlog() {
        addBlog ({
            title:new_title, 
            date_time:new_date_time, 
            author_name:new_author_name, 
            content_text:new_content_text, 
            picture:new_picture,
            special:new_special,
            category_id:new_category_id
        });
    }

    return (
        <section className="preview">
            <h2>New blog</h2>
            <div className="grid-container">
                <div className="grid-item">Title</div>
                <div className="grid-item"><input placeholder='title' value={new_title} onChange={({target}) =>{setNewTitle(target.value)}} /></div>
                <div className="grid-item">Datetime</div>
                <div className="grid-item"><input placeholder='date_time' value={new_date_time} onChange={({target}) =>{setNewDate_time(target.value)}} /></div>
                <div className="grid-item">Author</div>
                <div className="grid-item"><input placeholder='author_name' value={new_author_name} onChange={({target}) =>{setNewAuthor_name(target.value)}} /></div>
                <div className="grid-item">Content</div>
                <div className="grid-item"><input placeholder='content_text' value={new_content_text} onChange={({target}) =>{setNewContent_text(target.value)}} /></div>
                <div className="grid-item">Link to picture</div>
                <div className="grid-item"><input placeholder='Link to picture' value={new_picture} onChange={({target}) =>{setNewPicture(target.value)}} /></div>
                <div className="grid-item">Special</div>
                <div className="grid-item"><input placeholder='special' value={new_special} onChange={({target}) =>{setNewSpecial(target.value)}} /></div>
                <div className="grid-item">Category id</div>
                <div className="grid-item">
                    <select onChange={({target}) =>{setNewCategory_id(target.value)}} name="category_id">
                        {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.id}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
            <button onClick={handleAddBlog}>Add blog</button>
        </section>
    )
}