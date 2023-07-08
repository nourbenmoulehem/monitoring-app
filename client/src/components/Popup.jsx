import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from  '@mui/material';
import ActionButton from "./ActionButton.jsx";
import CloseIcon from '@mui/icons-material/Close';


export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;


    return (
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <ActionButton
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
