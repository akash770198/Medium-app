import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { Unique } from './pages/Unique'
import { DeleteBlog } from './pages/Delete'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/unique/:userid" element={<Unique />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/blog/edit/:blogId" element={<Publish/>} />
          <Route path="/blog/delete/:blogId" element={<DeleteBlog/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App