import React from 'react';
import { useState } from 'react';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';


const AddEmployeeComponent = () => {

    const [message, setMessage] = useState("");

    return (

        <Formik initialValues={{

            Id: '',
            Name: '',
            Location: '',
            Salary: '',

        }} validationSchema={yup.object({

            Name: yup.string().max(20, 'Name should not exceed 20 Characters').
                required('Please Enter Employee Name'),

            Id: yup
                .number('Id must be a number')
                .required('Please Enter Id')
                .positive('Id number must be positive')
                .integer('Id number must be an integer'),

            Location: yup.string()
                .required('Please Enter Employee Location'),

        })} onSubmit={values => {

            fetch('https://localhost:44314/api/Employee', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values)
            }).then(r => r.json()).then(res => {
                if (res) {
                    setMessage('New Employee is Created Successfully');
                }
            });

        }}>

            {props => (
                <div>
                    <Form>
                        <h2>Please Enter Employee Details...</h2>
                        <p>
                            <label htmlFor="Id">Employee Id </label>
                            <Field name="Id" type="number"></Field>
                            <span style={{ color: 'red' }}><ErrorMessage name="Id"></ErrorMessage></span>

                        </p>
                        <p>
                            <label htmlFor="Name">Employee Name </label>
                            <Field name="Name" type="text"></Field>
                            <span style={{ color: 'red' }}><ErrorMessage name="Name"></ErrorMessage></span>

                        </p>
                        <p>
                            <label htmlFor="Location">Employee Location </label>
                            <Field name="Location" type="text"></Field>
                            <span style={{ color: 'red' }}><ErrorMessage name="Location" ></ErrorMessage></span>

                        </p>
                        <p>
                            <label htmlFor="Salary">Employee Salary </label>
                            <Field name="Salary" type="number"></Field>
                            <span style={{ color: 'red' }}><ErrorMessage name="Salary"></ErrorMessage></span>
                        </p>
                        <button type="submit" disabled={props.isValid==false}>Create</button>
                    </Form>
                    <p>{message}</p>
                </div>
            )}
        </Formik>
    )

}


export default AddEmployeeComponent;