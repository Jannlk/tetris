import React from "react";
import Block from "../block/Block";
import './Square.css'

interface SquareProps {
    containsBlock: boolean
}

function Square({containsBlock}: SquareProps) {
    let empty = <div className="Square"/>;
    let block = <div className="Square"><Block /></div>;

    return (
        containsBlock? block : empty
    );
}

export default Square