import {Routes, Route, Redirect, useNavigate} from 'react-router-dom';
import {useState, useEffect } from 'react';
import {getCategories, getBlogs, postBlog, postUser, loginUser, logoutUser} from './controllers/api';
import Categories from './views/categories';
import Blogs from './views/blogs';
import SpecialBlogs from './views/specialblogs';
import Blogdetail from './views/blogs_detail';
import BlogNew from './views/blog_add';
import Register from './views/register';
import Login from './views/login';
import Loader from './views/loader';
import Search from './views/search';

function App() {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(true);
  const nav = useNavigate();

  async function readData() {
    const fetchBlogs = await getBlogs();
    const fetchCategories = await getCategories();
    setCategories(fetchCategories);
    setBlogs(fetchBlogs);
    if(blogs && categories) {
      setIsDataLoading(false);
    }
  }

  const addBlog = async (blog) => {
    const token = localStorage.getItem("token");
    const newblog = await postBlog(blog, token);
    setBlogs(prev => ([...prev, newblog]));
    readData();
    nav('/');
  }

  const login = async (username, password) => {
    const result = await loginUser(username, password);
    localStorage.setItem("token", result);
    nav('/');
  }

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    nav('/');
  }

  const register = async (username, password) => {
    const result = await postUser(username, password);
    console.log(result);
    nav('/');
  }

  const handleSearch = (search) => {
    setSearch(search);
  }

  useEffect(() => {
    readData();
  }, [])

  useEffect(() => {
    if(search.length > 0) {
      setBlogs(blogs.filter(b => {return b.title.toLowerCase().startsWith(search.toLowerCase())}));
    } else {
      readData();
    }
  }, [search])

  return isDataLoading ? (
    <Loader />
  ) : (
    <div id="wrapper">
      <header>
        <h2>Travel blog</h2>
      </header>
      <div id="content">
        <nav>
          <Search blogs={blogs} handleSearch={handleSearch} search={search}/>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
          <Categories blogs={blogs} categories={categories} logout={logout}/>
        </nav>
        <main>
        <Routes>
          <Route path='/' element={<Blogs blogs={blogs} />} />
          <Route path="/:id" element={<Blogdetail blogs={blogs} />} />
          <Route path='/blog' element={<BlogNew addBlog={addBlog} categories={categories} />} />
          <Route path='/login' element={<Login login={login} />} />
          <Route path='/register' element={<Register register={register} />} />
          <Redirect from="*" to="/" />
        </Routes>
        </main>
        <aside>
          <h3>Special offers</h3>
          <SpecialBlogs blogs={blogs} />
        </aside>
      </div>
    </div>
  );
}

export default App;