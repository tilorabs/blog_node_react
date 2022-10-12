const url = 'https://blog-project2022.herokuapp.com'; //data from backend

async function getCategories() {
    const response = await fetch(url + '/categories');
    const result = await response.json();
    return result;
}

async function getBlogs() {
    const response = await fetch(url + '/blogs');
    const result = await response.json();
    return result;
}

async function postBlog(blog, token) {
    const response = await fetch(url + '/blog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(blog)
    });
    if(response.ok) {
        const result = await response.json();
        return result;
    }
    throw Error('Adding blog failed');
}

async function postUser(username, password) {
    const response = await fetch(url + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    if(response.ok) {
        const result = await response.json();
        return result;
    }
    throw Error('Adding user failed');
}

async function loginUser(username, password) {
    const response = await fetch(url + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({username, password})
    });
    if(response.ok) {
        const result = await response.json();
        return result?.token;
    }
    throw Error('Login user failed');
}

async function logoutUser() {
    const response = await fetch(url + '/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    if(response.ok) {
        const result = await response.json();
        return result;
    }
    throw Error('Logout failed');
}

export {getCategories, getBlogs, postBlog, postUser, loginUser, logoutUser};