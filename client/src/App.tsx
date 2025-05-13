/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SongList from "./components/SongList";
import SongStat from "./components/SongStats";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <div
                css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 98vw;
                    padding: 0;
                    margin: 0;
                    overflow-x: hidden;
                `}
            >
                <SongList />
                <SongStat />
                <ToastContainer />
            </div>
        </>
    );
}

export default App;
