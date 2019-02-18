import React from "react";
import "./ArticleCard.css"

const ArticleCard = (props) => {
    let articleDate = new Date(props.tsp);
    console.log(articleDate);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (
        <div className="articleCard_container">
            <div className="articleCard_title" >{props.title}</div>
            <div className="articleCard_authorID" >author: {props.authorID}</div>
            <div className="articleCard_verticleLine"/>
            {/* <div className="articleCard_content" >{props.content}</div> */}
            <div className="articleCard_descript" >{props.descript}</div>
            <div className="articleCard_likes" >likes: {props.likes}</div>
            <div className="articleCard_date" >{articleDate.getDate()}</div>
            <div className="articleCard_month" >{months[articleDate.getMonth()]}</div>
        </div>
    );
}

export default ArticleCard;

// articleID: 1
// authorID: 211
// content: "hey there this is the body of the post"
// descript: "description"
// likes: 0
// title: "hello"
// tsp: "2019-02-09T18:30:00.000Z"