import React, { useEffect, useState } from 'react';
import {List, Avatar, Typography, Row,Col} from 'antd';
import axios from 'axios';
import SideVideo from './Section/sideVideo'
import Subscriber from './Section/Subscriber';
import Comments from './Section/Comments'
import LikeDislike from './Section/LikeDislike'

function DetailVideo(props){
    
    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })

            axios.post('/api/comment/getComments', videoVariable)
            .then(response => {
                if (response.data.success) {
                    
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })
    },[])
    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

if(Video.writer){

    return(
        <Row >
        <Col lg={18} xs={24}>
        <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
        <video style={{ width: '100%', maxHeight: '550px' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

        <List.Item
        //value of login id is stored in windows local storage while making signin page
            actions={[<LikeDislike video videoId={videoId} userId={localStorage.getItem('userId')}/>,<Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')}/>
            ]}
        >
           
           <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<a href="https://ant.design">{Video.title}</a>}
                                description={Video.description}
                            />
            <div></div>
        </List.Item>

        <Comments CommentLists={CommentLists}  postId={Video._id} refreshFunction={updateComment} />
        
    </div>
    </Col>
    <Col lg={6} xs={24}>

     <SideVideo />
       

    </Col>
    </Row>
    )
}
else{
    return<div>
    <br />
        <h3>.....just a moment felllas....</h3>
    </div>
}

}

export default DetailVideo;