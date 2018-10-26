import React, { Component } from 'react';
import { PostWrapper, Navigator, Post, CommentList, Warning } from '../../components';
import * as service from '../../services/post';

class PostContainer extends Component {

    constructor(props) {
        super();
        // 일반적으로 함수를 선언하면, 아래와 같이 메소드에서 this에 접근하기위해서 constructor에서 
        // bind를 해줘야함..
        // this.myMethod = this.myMethod.bind(this);

        // state초기화
        this.state = {
            postId: 1,
            fetching: false,
            post: {
                title: null,
                body: null
            },
            comments: [],
            warningVisibility: false
        }
    }

    // myMethod() {  }


    // 이렇게 화살표함수로 메소드 선언하면..binding따로 하지 않아도 자동으로 됨.!!
    // 이는 babel 플러그인 transform-class-properties 가 적용되어있기 때문, create-react-app 으로 만든 프로젝트는 자동으로 적용
    fetchPostInfo = async (postId) => {
        // const post = await service.getPost(postId);
        // console.log(post);
        // const comments = await service.getComments(postId);
        // console.log(comments)


        if(this.state.fetching) return;

        this.setState({
            fetching: true
        })

        try {
            const info = await Promise.all([
                service.getPost(postId),
                service.getComments(postId)
            ]);
    
            console.log(info)
            const { title, body } = info[0].data;
            const comments = info[1].data;
    
            this.setState({
                postId,
                post: {
                    title,
                    body
                },
                comments,
                fetching: false
            })
        } catch (e) {
            this.setState({
                fetching: false
            });
            this.showWarning();
            console.log('error occurred', e);
        }   
        
    }


    handleNavigateClick = (type) => {
        const postId = this.state.postId;

        if(type === 'NEXT') {
            this.fetchPostInfo(postId+1);
        } else {
            this.fetchPostInfo(postId-1);
        }
    }

    showWarning =() => {
        this.setState({
            warningVisibility: true
        })

        setTimeout(() => {
            this.setState({
                warningVisibility: false
            })
        }, 1500);
    }

    componentDidMount() {
        this.fetchPostInfo(1);
    }

    render() {
        const {postId, fetching, post, comments, warningVisibility} = this.state;

        return (
            <PostWrapper>
                <Navigator 
                    postId={postId}
                    disabled={fetching}
                    onClick={this.handleNavigateClick}    
                />
                <Post 
                    postId={postId}
                    title={post.title}
                    body={post.body}
                    comments={comments}    
                />
                <Warning message={"not exist"}  visible={warningVisibility}/>
            </PostWrapper>
        )
    }
}

export default PostContainer