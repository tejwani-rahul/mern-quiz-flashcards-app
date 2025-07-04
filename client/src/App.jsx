import {Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import HomeRedirect from './components/HomeRedirect';

import SelectMode from './Pages/Quiz/SelectMode';
import Signup from './Pages/Auth/Signup';
import Login from './Pages/Auth/Login';
import SelectTopic from './Pages/SelectTopic';
import QuizPage from './Pages/Quiz/QuizPage';
import FlashCardPage from './Pages/Quiz/FlashCardpage';
import ReviewQuiz from './Pages/Quiz/ReviewQuiz';
import Layout from './Pages/NavBar/Layout';
import Report from './Pages/Quiz/Report';
import Leaderboard from './Pages/Leaderboard';



import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ManageUsers from './Pages/Admin/ManageUsers';
import ManageResults from './Pages/Admin/ManageResults';
import ManageFlashcards from './pages/Admin/ManageFlashcards';  
import ManageQuizzes from './Pages/Admin/ManageQuizzes';
import ManageTopics from './Pages/Admin/ManageTopics';






function App() {
  return (
    <div className='App'>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<HomeRedirect/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route path='/topics' element={<ProtectedRoute><SelectTopic /></ProtectedRoute>} />
          <Route path='/topics/:topic' element={<ProtectedRoute><SelectMode /></ProtectedRoute>} />
          <Route path='/quiz/:topic' element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path='/flashcards/:topic' element={<ProtectedRoute><FlashCardPage /></ProtectedRoute>} />
          <Route path='/quiz/:topic/review' element={<ProtectedRoute><ReviewQuiz /></ProtectedRoute>} />
          <Route path='/report' element={<ProtectedRoute><Report /></ProtectedRoute>} />
          <Route path='/leaderboard' element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />


          {/* Admin routes */}
          <Route path="/admin/users" element={<ProtectedAdminRoute><ManageUsers /></ProtectedAdminRoute>} />
          <Route path="/admin/reports" element={<ProtectedAdminRoute><ManageResults /></ProtectedAdminRoute>} />  
          <Route path="/admin/quizzes/:topic" element={<ProtectedAdminRoute><ManageQuizzes /></ProtectedAdminRoute>} />
          <Route path="/admin/flashcards/:topic" element={<ProtectedAdminRoute><ManageFlashcards /></ProtectedAdminRoute>} />
          <Route path="/admin/topics" element={<ProtectedAdminRoute><ManageTopics /></ProtectedAdminRoute>} />
        </Route>
    
        {/* Catch-all route for 404 */}
        <Route path='*' element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
