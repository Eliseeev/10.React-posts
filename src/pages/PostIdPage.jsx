import React, {useParams} from 'react-router-dom'
import {useEffect, useState,} from 'react'
import {useFetching} from '../hooks/useFetching'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'


const PostIdPage = () => {
  const params = useParams()
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching( async (id) => {
    const response = await PostService.getById(params.id)
    setPost(response.data)
  })

  
  const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
    const response = await PostService.getCommentsByPostId(params.id)
    setComments(response.data)
  })


  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])

   return (
    <div>
        <h1>You have reached the page of the post with ID = {params.id}</h1>
        {isLoading
            ? <Loader/>
            : <div>{post.id}. {post.title}</div>
          }

          <h1>
            Comments
          </h1>

          {isComLoading
          ? <Loader/>
          : <div>
              {comments.map((comn) => 
                <div style = {{marginTop: 15}}>
                  <h5>{comn.email}</h5>
                  <div>{comn.body}</div>
                </div>)}
            </div>}
    </div>
  )
}

export default PostIdPage