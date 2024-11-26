import { Fragment } from "react";
import { Dialog,DialogTitle, DialogActions,Button} from "@mui/material";
function Result({openDialog,activities,setOpenDialog}){
    return <Fragment>
        <Dialog open={openDialog}>
            <DialogTitle> 
                You Scored {activities.score}
            </DialogTitle>
            <DialogActions>

                    <Button onClick={()=>{
                        setOpenDialog(false)
                    }}>
                        close
                    </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}

export default Result