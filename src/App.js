import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ArticleCard from "./components/articleCard/ArticleCard";
import { Link, Route } from "react-router-dom";
import Article from './components/Article/Article'
class App extends Component {
  state = {
    articles: []
  };
  componentDidMount() {
    axios.get("http://localhost:5000/article").then(res => {
      this.setState({
        articles: [...this.state.articles, ...res.data.result]
      });
    });
  }
  render() {
    // console.log(this.state.articles);
    return (
      <div className="App">
        {this.state.articles.map(article => {
          // console.log(article);
          return (
            <div>
              <Route
                path="/"
                exact
                render={() => (
                  <Link
                    to={`/article/${article.articleID}`}
                    style={{
                      textDecoration: "none",
                      color: "black"
                    }}
                  >
                    <ArticleCard
                      key={article.articleID}
                      title={article.title}
                      authorID={article.authorID}
                      content={article.content}
                      descript={article.descript}
                      likes={article.likes}
                      tsp={article.tsp}
                    />
                  </Link>
                )}
              />
            </div>
          );
        })}
        <Route path="/article/:articleID" component={Article} />
      </div>
    );
  }
}

export default App;
