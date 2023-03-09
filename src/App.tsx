import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import NewNote from "./pages/NewNote";
import NoteList from "./pages/NoteList";
import {NoteLayout} from "./components/NoteLayout";
import NotePage from "./pages/NotePage";
import EditNote from "./pages/EditNote";
import {NoteTakerProvider} from "./context/NoteTakerContext";

function App() {
    return (
        <NoteTakerProvider>
            <Container className={'my-4'}>
                <Routes>
                    <Route path={'/'} element={<NoteList />}/>
                    <Route path={'/new'} element={<NewNote />} />
                    <Route path={'/:id'} element={<NoteLayout  />}>
                        <Route index element={<NotePage />}/>
                        <Route path={'edit'} element={<EditNote />} />
                    </Route>
                    <Route path={'*'} element={<Navigate to={'/'}/>}/>
                </Routes>
            </Container>
        </NoteTakerProvider>
    )
}

export default App
