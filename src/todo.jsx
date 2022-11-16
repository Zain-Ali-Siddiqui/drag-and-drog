import { EditFilled, DeleteOutlined } from '@ant-design/icons'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Draggable from 'react-draggable';
function Drag() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [data, setData] = useState([])
    const [todo, setTodo] = useState('')
    const [des, setDes] = useState('')
    const [indexvalue, setIndexvalue] = useState()
    const [show, setShow] = useState('hide')
    const [close, setClose] = useState(false);
    const handle = () => setClose(true);
    const handles = () => setClose(false);
    const addtodo = () => {
        if (todo === '' || des === '') {
            alert('please fill Todo')
        }
        else {
            let obj = {
                Todo: todo,
                Des: des,
            }
            setData(data.concat([obj]))
            setTodo('')
            setDes('')
            setOpen(false)
            setClose(false)
        }
    }
    const updated = () => {
        data[indexvalue].Todo = todo
        data[indexvalue].Des = des
        setShow('hide')
        setTodo('')
        setDes('')
        setOpen(false)
        setClose(false)
    }
    const cancel = () => {
        setShow('hide')
        setOpen(false)
        setClose(false)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        bgcolor: 'background.paper',
        p: 4,
    };
    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 40,
        height: 20,
        bgcolor: 'hsl(192deg 94% 94%)',
        p: 4,
    };
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <h1>Drag & Drop Taskboard</h1>
            </div>
            <div className="main_div">
                <div className="inner_div">
                    <div className="todo">
                        <div className="btn_div">
                            <h2>Todo </h2>
                            <div className='btn'>
                                <Button onClick={handleOpen} className='modal' >Add</Button>
                                <Modal
                                    open={open}
                                    aria-labelledby='modal-modal-title'
                                    aria-describedby='modal-modal-description'
                                >
                                    <Box sx={style}>
                                        <h2 id='modal-modal-title' variant='h6'  style={{ color: 'black', fontWeight: '600' }} >
                                            Add Item
                                        </h2>
                                        <div id='modal-modal-description' sx={{ mt: 2 }}>
                                            <div className='head'>
                                                <div className='div'  >
                                                    <div className='upper_div'>
                                                        <div>
                                                            <h3>Title</h3>
                                                            <input value={todo} onChange={(e) => { setTodo(e.target.value) }} />
                                                            <br />
                                                            <h3>Description</h3>
                                                            <textarea value={des} onChange={(e) => { setDes(e.target.value) }} cols='52' rows='8' ></textarea>
                                                        </div>
                                                    </div>
                                                    <div className='button_div'>
                                                        <button onClick={cancel} className='cancel_btn'> Cancel </button>
                                                        {show === 'hide' ? <button className='button' onClick={addtodo}>Ok</button> :
                                                            <button className='button' onClick={updated}>Ok</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    {data?.map((v, i) => {
                        return (
                            <Draggable axis='x'>
                                <div className="div_1">
                                    <div className='inner_div1' >
                                        <br />
                                        <td className='charge' style={{ color: 'black' }}  >{v.Todo}</td>
                                        <hr />
                                        <td className='charged' style={{ color: 'black' }}  >{v.Des}</td>
                                        <br />
                                    </div>
                                    <div>
                                        <Button className='vert' onClick={handle} ><MoreVertIcon className='verticon' /></Button>
                                    </div>
                                    <Modal open={close} onClose={handles}>
                                        <Box sx={styles}>
                                            {show === 'hide' ?
                                                <>
                                                    <div className='butt' >
                                                        <div >
                                                            <button className='but' onClick={() => {
                                                                let todos = data[i].Todo
                                                                let dess = data[i].Des
                                                                setTodo(todos)
                                                                setDes(dess)
                                                                setIndexvalue(i)
                                                                setShow('show')
                                                                setOpen(true)
                                                                setClose(false)
                                                            }}
                                                            ><EditFilled className='edit' /> Edit </button>
                                                            <br />
                                                            <button className='but del' onClick={() => {
                                                                setClose(false)
                                                                let deleteone = data.filter((value, index) => {
                                                                    return i !== index
                                                                })
                                                                setData(deleteone)
                                                            }}><DeleteOutlined className='delt' /> Delete </button>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <div   >
                                                    <button className='butDis but' > <EditFilled /> </button>
                                                    <button className='butDis but'   ><DeleteOutlined />  </button>
                                                </div>
                                            }
                                        </Box>
                                    </Modal>
                                </div>
                            </Draggable>
                        )
                    })}
                </div>
                <div className="inner_div" >
                    <h2 className="progress">In Progress</h2>
                </div>
                <div className="inner_div">
                    <h2 className="done">Done</h2>
                </div>
            </div>
        </>
    )
}
export default Drag