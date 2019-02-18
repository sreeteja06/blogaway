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
          <div class="article_container">
            <div className="article_Title" >Article Title</div>
            <div className="article_content">this is where all the content will be stored. wish u a very happy and prosperous journey</div>
            <div className="article_line" />
            <div className="article_authorText">Author</div>
            <div className="article_authorID">
              {this.props.match.params.articleID}
            </div>
            <div className="article_likesText">Likes</div>
            <div className="article_likesCount">
              {this.props.match.params.articleID}
            </div>
          </div>
        );
    }
}

export default Article;