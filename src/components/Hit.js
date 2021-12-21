import styled from "styled-components";

const Hit = ({info}) => {
    let left = `${info.xLeft}px`;
    let top = `${info.yTop}px`;
    let size = `${info.fieldWidth}px`;

    const Circle = styled.div`
        left: ${left};
        top: ${top};
        position: absolute;
        border-radius: 50%;
        z-index: 1;
        border: ${(info.fieldWidth/100)*9}px solid black;
        width: ${size};
        height: ${size};
    `;

    return(
        <Circle />
    );
};

export default Hit;