import React, { Component } from "react";
import axios from "axios";

class NewArticle extends Component {
  handleSubmit(event) {
    event.preventDefault();
    
    var params = {
      content: this.refs.content.value,
      title: this.refs.title.value,
      description: this.refs.description.value,
      userid: this.refs.userid.value
    };
    console.log(params);
      axios({
          method: 'post',
          url: 'http://localhost:5000/addArticle',
          params
      }).then(res=>{
          console.log(res);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={e=>this.handleSubmit(e)}>
          <label>Article Title</label>
          <input
            type="text"
            ref="title"
          />
          <br />
          <label>Article Description</label>
          <input
            type="text"
            ref="description"
          />
          <br />
          <label>Article Author</label>
          <input
            type="number"
            ref="userid"
          />
          <br />
          <label>Article Content</label>
          <textarea
            rows="5"
            cols="50"
            wrap="soft"
            ref="content"
          />
          <br />
          <input type="Submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default NewArticle;
