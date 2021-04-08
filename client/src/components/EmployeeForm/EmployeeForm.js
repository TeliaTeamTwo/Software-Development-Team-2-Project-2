import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import './EmployeeForm.scss';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../../actions/employees';

const EmployeeForm = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '', about: '', skills: '', typeOfWork: '', image: '', location: '',
        qualification: '', experience: ''
    });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createEmployee(employeeData));
        clear();
    }

    const clear = () => {
        setEmployeeData({ name: '', about: '', skills: '', typeOfWork: '', image: '', location: '',
        qualification: '', experience: '' });
    }

    return (
        <div>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <h2>Create a profile to find your dream job!</h2>
            <label>Name</label>
            <input value={employeeData.name} onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}></input>
            <label>About</label>
            <input value={employeeData.about} onChange={(e) => setEmployeeData({ ...employeeData, about: e.target.value })}></input>
            <label>Skills</label>
            <input value={employeeData.skills} onChange={(e) => setEmployeeData({ ...employeeData, skills: e.target.value })}></input>
            <label>Type Of Work</label>
            <input value={employeeData.typeOfWork} onChange={(e) => setEmployeeData({ ...employeeData, typeOfWork: e.target.value })}></input>
            <label>Location</label>
            <input value={employeeData.location} onChange={(e) => setEmployeeData({ ...employeeData, location: e.target.value })}></input>
            <label>Qualification</label>
            <input value={employeeData.qualification} onChange={(e) => setEmployeeData({ ...employeeData, qualification: e.target.value })}></input>
            <label>Experience</label>
            <input value={employeeData.experience} onChange={(e) => setEmployeeData({ ...employeeData, experience: e.target.value })}></input>
            <label>Image</label>
            <FileBase 
                type="file"
                multiple={false}
                onDone={({base64}) => setEmployeeData({ ...employeeData, image: base64 })}
            />
            <button type="submit">Submit</button>            
            </form>
        </div>
    );
};

export default EmployeeForm;