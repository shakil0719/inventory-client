import React from "react";

const Blog = () => {
  return (
    <div className="text-warning container min-vh-100 d-flex flex-column justify-content-center py-5">
      <h2>Q:1--Difference between javascript and nodejs</h2>
      <p>
        Javascript is an implementation of ECMAScript, a standard defining the
        programming language. Browsers have a built-in interpreter for
        Javascript, along with a bunch of libraries and a run-time environment
        for working with web pages. Nodejs is an interpreter and environment for
        javascript which includes a bunch of libraries for using javascript as a
        general-purpose programming language, with an emphasis on asynchronicity
        and non-blocking operations
      </p>
      <h2>Q:2--When should you use nodejs and when should you use mongodb</h2>
      <p>
        Nodejs is asynchronous and helps to build scalable applications, whereas
        the most used NoSQL Database Management System is MongoDB. MongoDB
        usually represents data as the collection of documents rather than
        tables. This makes it easy for various types of data that can be stored
        and accessed in the web app using Nodejs. Since it is perfect for
        frequently changing data, it is mostly used along with Nodejs.
      </p>
      <h2>Q:3--Differences between Sql and NoSql databases.</h2>
      <p>
        1.SQL databases are based on the tables, whereas NoSQL databases are
        based on the document, graph, and so on. 2.SQL databases are better for
        multi-row transactions while NoSQL is better for JSON. 3.SQL databases
        are vertically scalable, but NoSQL databases are horizontally scalable.
        4.SQL databases have predefined schemas that use structured query
        language. On the other hand, NoSQL doesn't use structured data. 5.SQL
        databases are relational and NoSQL are non-relational. 6.SQL is not
        suitable for hierarchical data storage, but NoSQL is suitable for
        hierarchical data storage. 7.SQL can be used for complex queries. NoSQL
        is not good for complex queries. 8.The best SQL databases available at
        present are MySQL and Oracle. The most popular NoSQL database is
        MongoDB.
      </p>
      <h2>Q:4--What is the purpose of jwt and how does it work.</h2>
      <p>
        JWT provide mainly security for web applications, but can be used and
        for storing and exchanging session related information between the
        client and the server. JWT consist of several parts, which are decoded
        and used by the client. They have several benefits over cookies, but as
        I haven't used them, only read about them, it is all I can share.
      </p>
    </div>
  );
};

export default Blog;
