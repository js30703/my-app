import React, {useState} from 'react'
import {Howl} from 'howler';
import { Button, Collapse,InputGroup, FormControl,Modal} from 'react-bootstrap'


export default function WordCard(props:any){
    let { lesson, order, kor, eng} = props.sent
    let H = new Howl(
        {
            src:[``],
            volume: 0.5,
            onend: () => {setIsPlaying(false)}
        }
    )
    const [inp, setInp] = useState('')
    const [swit, setSwit] = React.useState(false)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(!show)
    const [isPlaying, setIsPlaying] = useState(false)

   

    return (
        <div style={{
            marginLeft: 'auto',
            marginRight:'auto',
            marginTop:'10px',
            marginBottom:'15px'
            }}>
            <InputGroup >
            <InputGroup.Append>
        {isPlaying ? <Button variant="outline-secondary" 
            disabled > ▶ </Button> 
            :
            <Button variant="outline-secondary" 
            onClick ={() =>{ setIsPlaying(!isPlaying); H.play()}} 
            aria-controls="example-collapse-text"
            > ▶ </Button>}
            </InputGroup.Append>
            <FormControl onChange ={ e => setInp(e.target.value) } placeholder="???"/>

            <InputGroup.Append>
                <Button variant="outline-secondary" 
                onClick ={() => setSwit(!swit)} 
                aria-controls="example-collapse-text"
                aria-expanded={swit}> ? </Button>
            </InputGroup.Append>

            <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={() =>{setShow(!show)}} > check </Button>
            </InputGroup.Append>
            </InputGroup>
                

            <Collapse in={swit}>
            <div id="example-collapse-text">
            
            {'img'}
            </div>
        </Collapse>
                
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <SentenceCheck inp={inp} kor={kor}/> */}
        </Modal.Body>

        
      </Modal>
        
        </div>
    )
}