import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "./store/songSlice";

function App() {
    const dispatch = useDispatch();
    const songs = useSelector((state: any) => state.songs.data);

    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);

    console.log(songs);

    return (
        <>
            <div>Music App</div>
        </>
    );
}

export default App;
