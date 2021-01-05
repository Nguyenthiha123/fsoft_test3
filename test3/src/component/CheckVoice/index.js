import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'


const form = {
    padding: '30px',
    position: 'relative',
    left: '380px'
};
const mb = {
    width: '500px'
};
const label = {
    float: 'left'
};
const button = {
    position: 'relative',
    left: '-370px',
    top: '30px'
};

const CheckVoice = props => {
    const history = useHistory()
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = dataCheck => Check(dataCheck);

    const Check = async (e) => {
        const Data = new FormData();
        Data.append('audious', e.audious1[0]);
        console.log(Data)
        const dataCheck = await axios.post('http://52.221.81.214:4556/api/v1/voice/identify', Data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        const res = dataCheck.data;
        if (res.status === 200) {
            const data = res.data;
            console.log(data);
            document.write('Ho ten:' + data.name);
        }
        else {
            history.push('/checkvoice')
            Swal.fire(
                'Giong noi khong chinh xac',
                'You clicked the button!',
                'error'
            )
        }
        console.log(dataCheck)
    }
    return (
        <div className='container'>
            <h1 className="text-success">Recognize Voice</h1>
            <form style={form} onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3" style={mb}>
                    <label style={label} htmlFor="formFile" className="form-label">Giọng nói</label>
                    <input name='audious1' ref={register({ required: true })} className="form-control" type="file" id="formFile" />
                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                    </small>
                </div>

                <button style={button} type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

CheckVoice.propTypes = {

}

export default CheckVoice
