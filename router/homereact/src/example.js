import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt,
  useLocation,
  NavLink,
} from "react-router-dom";

const Header = () => {
  return (
    <>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/add-book">
            Add Book
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/company">
            Company
          </NavLink>
        </li>
      </ul>

      <hr />
    </>
  );
};

const Content = (props) => {
  return (
    <div className="content">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products bookFacade={props.bookFacade} />
        </Route>
        <Route path="/compnay">
          <Company />
        </Route>
        <Route path="/add-book">
          <AddBook bookFacade={props.bookFacade} />
        </Route>
      </Switch>
    </div>
  );
};

export default function BasicExample(props) {
  return (
    <Router>
      <div>
        <Header />
        <Content bookFacade={props.bookFacade} />
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Products(props) {
  return (
    <div>
      <h2>
        {props.bookFacade.getBooks().map((book) => (
          <li key={book.toString()}>{book.title}</li>
        ))}
      </h2>
    </div>
  );
}

function AddBook(props) {
  const emptyBook = { id: "", title: "", info: "" };
  const [book, addBook] = useState(emptyBook);
  let [isBlocking, setIsBlocking] = useState(false);

  const handleChange = (event) => {
    setIsBlocking(event.target.value.length > 0);
    const target = event.target;
    const id = target.id;
    const value = target.value;
    addBook({ ...book, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    setIsBlocking(false);
    props.bookFacade.addBook(book);
    alert("The book you entered: " + book.info + " " + book.title);
  };

  return (
    <div>
      <Prompt
        when={isBlocking}
        message={(location) =>
          "Are you sure you want to go to ${location.pathname}"
        }
      />
      <h3> Add book </h3>
      <form onSubmit={handleSubmit}>
        <input
          id="title"
          value={book.title}
          placeholder="add title"
          type="text"
          onChange={handleChange}
        />
        <br />
        <input
          id="info"
          value={book.info}
          placeholder="add info"
          type="text"
          onChange={handleChange}
        />
        <br />
        <button>Submit</button>
      </form>
      <prompt
        when={isBlocking}
        message={(location) =>
          "Are you sure you want to go to ${location.pathname}"
        }
      />
    </div>
  );
}

function Company() {
  return (
    <div>
      <h2>Company</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>NoMatch</h2>
    </div>
  );
}
