import React, { useRef } from 'react'
import {useState, useEffect} from 'react';
import '../styles/App.css';
import PostList from "../components/PostList";
import MyButton from '../components/UI/buttons/MyButton';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import usePosts from '../hooks/usePosts'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader';
import {getPageCount} from "../utils/pages";
import {useFetching} from '../hooks/useFetching'
import Pagination from '../components/UI/pagination/Pagination'
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';


function Posts() {
        
      const [posts, setPosts] = useState([])

      const [filter, setFilter] = useState({sort: '', query: ''})

      const [modal, setModal] = useState(false);
      
      const [totalPages, setTotalPages] = useState(0);

      const [limit, setLimit] = useState(10);

      const [page, setPage] = useState(1);

      const sortedPostsAndSercheadPosts = usePosts(posts, filter.sort, filter.query);
      
      const lastElement = useRef()
        
        const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
              const response = await PostService.getAll(limit, page)
              setPosts([...posts, ...response.data])
              
           
              const totalCount = response.headers['x-total-count']
              setTotalPages(getPageCount(totalCount, limit))
        })

        useObserver(lastElement, page < totalPages, isPostsLoading, () => {
            setPage(page + 1)
        })

        const changePage = (page) => {
          setPage(page)
        }
                   
        useEffect(() => {
         
          fetchPosts(limit, page)
        }, [page, limit])

          const createPost = (newPost) => {
              setPosts([...posts, newPost])
              setModal(false)
          }
        
         
          const removePost = (post) => {
            setPosts(posts.filter(p => p.id !== post.id))
          }

          return (
            <div className = "App">
                
                <MyButton style ={{marginTop: 30}} onClick = {() => setModal(true)}>
                  Create a user
                </MyButton>

                  <MyModal visible = {modal} setVisible = {setModal}>
                      <PostForm create = {createPost}/>
                  </MyModal>
                
                  <hr style = {{margin: '15px 0'}}/> 
                      <PostFilter 
                      filter = {filter}
                      setFilter = {setFilter}
                      />
                      <MySelect
                        value = {limit}
                        onChange = {value => setLimit(value)}
                        defaultValue = "Number of items on the page"
                      
                        options = {[
                          {value: 5, name: '5'},
                          {value: 10, name: '10'},
                          {value: 15, name: '15'},
                          {value: -1, name: 'Show all'},
                          ]}
                        />
                      {postError && <h1>There was an error ${postError}</h1>}

                      <PostList remove = {removePost} posts = {sortedPostsAndSercheadPosts} title = 'Posts about JS'/>
                      <div ref = {lastElement} style = {{height: 20, backgroundColor: 'white'}}></div>
                      
                      {isPostsLoading  &&
                      <div style = {{display:'flex', justifyContent: 'center', marginTop: 150}}><Loader /></div>}
                     
                     
                      <Pagination 
                        page = {page} 
                        changePage = {changePage} 
                        totalPages = {totalPages}
                      />
                  
            </div>
          )
        }

export default Posts