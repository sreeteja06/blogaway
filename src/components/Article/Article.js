import React, { Component } from 'react';
import axios from "axios";
import './Article.css'

class Article extends Component {
    state = {  }
    componentDidMount() {
        console.log(this.props)
        axios.get(
          "http://localhost:5000/article/" +
            this.props.match.params.articleID
        ).then(res=>{
            console.log(res);
        });
    }
    render() {
        console.log("this.props");
        return (
          <div>
            <div className="article_Title" >Article Title</div>
            <div className="article_line" />
            <div className="article_authorText">author</div>
            <div className="article_authorID">
              {this.props.match.params.articleID}
            </div>
            <div className="article_likesText">likes</div>
            <div className="article_likesCount">
              {this.props.match.params.articleID}
            </div>
          </div>
        );
    }
}

export default Article;