import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './Layout.tsx';
import {Create, Home, Likes, Search, Settings, SignIn, SignUp, User} from './pages';

const App = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: '',
                    element: <Home/>
                },
                {
                    path: 'signup',
                    element: <SignUp/>
                },
                {
                    path: 'signin',
                    element: <SignIn/>
                },
                {
                    path: 'search',
                    element: <Search/>
                },
                {
                    path: 'create',
                    element: <Create/>
                },
                {
                    path: 'settings',
                    element: <Settings/>
                },
                {
                    path: 'likes',
                    element: <Likes/>
                },
                {
                    path: ':username',
                    element: <User/>
                }
            ]
        }
    ])

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
};

export default App;