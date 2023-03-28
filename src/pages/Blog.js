import axios from "axios";
import React, { useState, useEffect } from "react";
import Article from "../components/Article";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const Blog = () => {
    const [blogData, setBlogData] = useState([]);
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [error, setError] = useState(false);

    const getData = () => {
        axios
            .get("http://localhost:3004/articles")
            .then((res) => setBlogData(res.data));
    };
    useEffect(() => getData(), []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (content.length < 140) {
            setError(true);
        } else {
            axios.post("http://localhost:3004/articles", {
                author,
                content,
                date: Date.now(),
            });
            setAuthor("");
            setContent("");
            setError(false);
            getData();
        }
    };
    return (
        <div className="blog-container">
            <Logo />
            <Navigation />
            <h1>BLOG</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Nom"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <textarea
                    style={{ border: error ? "1px solid red" : "" }}
                    placeholder="Message"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onChangeCapture={() => setError(false)}
                ></textarea>
                {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
                <input type="submit" value="Envoyer" />
            </form>
            <ul>
                {blogData
                    .sort((a, b) => b.date - a.date)
                    .map((article) => (
                        <Article key={article.id} article={article} />
                    ))}
            </ul>
        </div>
    );
};

export default Blog;
