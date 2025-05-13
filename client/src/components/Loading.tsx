/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
`;

const Loading = () => {
    return <div css={container}>Loading...</div>;
};

export default Loading;
