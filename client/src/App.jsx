import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

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

function App() {
  return (
    <div className='App'>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route path='/user/topics' element={<ProtectedRoute><SelectTopic /></ProtectedRoute>} />
          <Route path='/topics/:topic' element={<ProtectedRoute><SelectMode /></ProtectedRoute>} />
          <Route path='/flashcards/:topic' element={<ProtectedRoute><FlashCardPage /></ProtectedRoute>} />
          <Route path='/quiz/:topic/review' element={<ProtectedRoute><ReviewQuiz /></ProtectedRoute>} />
          <Route path='/report' element={<ProtectedRoute><Report /></ProtectedRoute>} />
          <Route path='/leaderboard' element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        </Route>

        {/* Standalone protected route (no layout) */}
        <Route path='/quiz/:topic' element={
          <ProtectedRoute><QuizPage /></ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
