import React from 'react'
import { Button } from '@mui/material';




export default function ActionButton(props) {

    const {  children, onClick } = props;


    return (
        <Button

            onClick={onClick}>
            {children}
        </Button>
    )
}
