import React from 'react';
import { useState } from 'react';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';


const AddEmployeeComponent = () => {

    const [message, setMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            Id: '',
            Name: '',
            Location: '',
            Salary: ''
        },

        validationSchema: yup.object({

            Name: yup.string().max(20, 'Name should not exceed 20 Characters').
                required('Please Enter Employee Name'),

            Id: yup
                .number('Id must be a number')
                .required('Please Enter Id')
                .positive('Id number must be positive')
                .integer('Id number must be an integer'),

            Location: yup.string()
                .required('Please Enter Employee Location'),

        }),

        onSubmit: values => {
            fetch('https://localhost:44314/api/Employee', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values)
            }).then(r => r.json()).then(res => {
                if (res) {
                    setMessage('New Employee is Created Successfully');
                }
            });

        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h2>Please Enter Employee Details...</h2>
                <p>

                <label htmlFor="Id">Employee Id : </label>
                    <input type="text" name="Id" id="Id" value={formik.values.Id}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.touched.Id && formik.errors.Id ? <span style={{ color: 'red' }}>{formik.errors.Id}</span> : null}

                </p>
                <p>
                    <label htmlFor="Name">Employee Name : </label>
                    <input type="text" name="Name" id="Name" value={formik.values.Name}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.touched.Name && formik.errors.Name ? <span style={{ color: 'red' }}>{formik.errors.Name}</span> : null}

                </p>
                <p>
                    <label htmlFor="Location">Employee Location : </label>
                    <input type="text" name="Location" id="Location" value={formik.values.Location}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.touched.Location && formik.errors.Location ? <span style={{ color: 'red' }}>{formik.errors.Location}</span> : null}

                </p>
                <p>
                    <label>Employee Salary : <input type="text" id="Salary"
                        name="Salary" value={formik.values.Salary} onChange={formik.handleChange}></input></label>
                </p>
                <button type="submit">Create</button>
            </form>
            <p>{message}</p>
        </div>
    )
}


export default AddEmployeeComponent;