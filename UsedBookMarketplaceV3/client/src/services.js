export const getBooks = async (applyFunc) => {
  const url = "http://localhost:8080/api/book";
  const res = await fetch(url);
  res.json().then(books => {
    applyFunc([...books])
  }) 
}


export const getCart = async (applyFunc)=> {
  const url = `http://localhost:8080/api/user/`;
  const res = await fetch(url);
  res.json().then(users => {
  const usercart =  users.find((user)=> user._id == JSON.parse(localStorage.getItem("userData")).id).myCart
   applyFunc([...usercart])
  })}


export const addBook = async (bookName, photoUrl, bookCondition, discription, price) => { 
  const { id, token } = JSON.parse(localStorage.getItem("userData"))
  const url = "http://localhost:8080/api/book";
  const body = JSON.stringify({bookName, photoUrl, bookCondition, discription, price});
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
	const res = await fetch(url, { method: "POST", body, headers });
  const result = await res.json();
  return result;
}

export const editBook = async (_id, bookName, photoUrl, bookCondition, discription, price) => { 
  const { id, token } = JSON.parse(localStorage.getItem("userData"))
  const url = `http://localhost:8080/api/book/${_id}`;
  const body = JSON.stringify({bookName, photoUrl, bookCondition, discription, price});
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
	const res = await fetch(url, { method: "PUT", body, headers });
  const result = await res.json();
  return result;
}

export const updateCart = async (myCart) => { 
  const { id, token } = JSON.parse(localStorage.getItem("userData"))
  const url = `http://localhost:8080/api/user/${id}`;
  const body = JSON.stringify({myCart});
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
	const res = await fetch(url, { method: "PATCH", body, headers });
  const result = await res.json();
  return result;
}


export const deleteBook = async (_id) =>{

  const { id, token } = JSON.parse(localStorage.getItem("userData"))
  const url = `http://localhost:8080/api/book/${_id}`;
  const body = null
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

	const res = await fetch(url, { method: "DELETE", body, headers });
  const result = await res.json();
  return result;

}



export const register = async (username, password) => { 
  const url = 'http://localhost:8080/api/user/register'; 
  const body = JSON.stringify({ username, password });
	const headers = { "Content-Type": "application/json" };
	const res = await fetch(url, { method: "POST", body, headers });
	const result = await res.json();
	return result;
}

export const login = async (username, password, applyFunc) => { 
  const url = "http://localhost:8080/api/user/login";
  const body = JSON.stringify({ username, password })
  const headers = { 'Content-Type': 'application/json' }
  const res = await fetch(url, { method: 'POST', body, headers });
  if (res.ok) {
    const result = await res.json();
    localStorage.setItem("userData", JSON.stringify({ token: result.token, id: result.user._id, username: result.user.username }));
    applyFunc(true); 

  } else { 
    applyFunc(false)

  }
 
}

export const logout = async () => { 
  const url = "http://localhost:8080/api/user/logout";
  const { id, token } = JSON.parse(localStorage.getItem("userData"));
  const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
  };
  const res = await fetch(url, { method: "POST", body: '', headers });
	const result = await res.json();
  localStorage.removeItem("userData");
  return result;
  
}
