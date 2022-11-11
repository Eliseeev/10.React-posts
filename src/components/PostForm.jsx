import React, {useState} from 'react'
import MyButton from './UI/buttons/MyButton';
import MyInput from './UI/input/MyInput';



function PostForm({create}) {
    const [post, setPost] = useState({ title: '', description: '', });

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {...post, id: Date.now()}
        setPost({title: '', description: '',})
          
        create(newPost)
      }
    
    return (
        <div>
            <form>
                
                <MyInput
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    type='text'
                    placeholder="Post title">
                </MyInput>

                <MyInput
                    value={post.description}
                    onChange={(e) => setPost({ ...post, description: e.target.value })}
                    type='text'
                    placeholder="Post description">
                </MyInput>

                <MyButton onClick={addNewPost}>Create a post</MyButton>
            </form>
        </div>
    );
}

export default PostForm