---
title: "Best Practices for using APIs within React"
date: "12/03/2024"
desc: "This post showcases the ways you should be using APIs within React."
hero: "/react.jpg"
heroAlt: "An open React project with the React logo being shown."
---

### Calling the API

When calling an API within a React component, you should call it within a useEffect hook. If you're not sure what a useEffect hook does, the callback function within a useEffect hook gets called when the component mounts or when one of its dependencies changes.

```
const [query, setQuery] = useState("");
const [posts, setPosts] = useState([]);
const [errMessage, setErrMessage] = useState("");

useEffect(() => {
  try {
    fetch(`https://myapi.com/posts?${query}`)
      .then(res => res.json())
      .then(data => setPosts(data))
  } catch (err) {
    console.log(err);
    setErrMessage("An error has occured!");
  }
}, [query])
```

With the above code, the code will be run when the component mounts or when the query changes. This means the API only needs to be called when needed, such as when a user inputs a term into a search bar. I've also wrapped the code within a try and catch block for handling any errors that might occur.

### Using the received data

When using the data received from an API call, you want to take care that you're doing it properly.

```
return (
  <section>
    {posts && posts.map(post => {
      return (
        <div key={post.id}>
          <h2>post.title</h2>
          <span>post.date<span>
          <p>post.content</p>
        </div>
      )
    })}
    {posts && posts.length === 0 && (
      <h4>No posts found.</h4>
    )}
    {errMessage !== "" && (
      <p className="err">{errMessage}</p>
    )}
  </section>
)
```

With this code, we're checking to ensure the posts variable is not null and then mapping the data. You always want to make sure you're checking if the variable the data is assigned to is not null before you try using it in your JSX. If you don't check, it might cause an error within your application. When mapping the fetched data, be sure to assign the key attribute to each of the rendered elements. The last thing in the code is I check to see if the data is empty, and if it is, I let the user know that nothing was found. It's good practice to tell your users that nothing was returned from your API call, rather than showing a blank results page.