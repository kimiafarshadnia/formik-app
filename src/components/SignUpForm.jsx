import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import axios from "axios";
import { useEffect } from "react";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import SelectInput from "./common/SelectInput";
//1

// const savedData = {
//   name: "kimia",
//   email: "farshadniakimia@gmail.com",
//   phone:"09134246753",
//   gender:"1",
//   password: "Kimia12#",
//   passwordConfirm:"Kimia12#",
// };

const radioOptions =[
  {label:"Male", value:"0"},
  {label:"Female", value:"1"}
]

const selectOptions =[
  {label:"select your age ...", value:""},
  {label:"1-10", value:"children"},
  {label:"10-18", value:"teenager"},
  {label:"18-25", value:"young"},
  {label:"25-older", value:"midelage"},
]

const initialValues = {
  name: "",
  email: "",
  phone:"",
  gender:"",
  age:"",
  password: "",
  passwordConfirm:"",
};

//2
const onSubmit = (values) => {
  console.log(values);
};

//3
const validationSchema = Yup.object({
  name : Yup.string().required("name is required"),
   
  email : Yup.string().email("Invalid email format").required("Email is required"),
  
  phone: Yup.string().required("phone number is required").matches(/^[0-9]{11}$/,"Invalid phone number ").nullable(),

  gender: Yup.string().required('Gender is required'),

  age: Yup.string().required('Gender is age'),

  password : Yup.string().required("Password is required").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ), 

  passwordConfirm: Yup.string().required(" password confirmation is required")
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const SignUpForm = () => {

  const [formValues , setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount : true, 
    enableReinitialize : true,
  });

  console.log("visited field", formik.touched);

  useEffect(()=>{
    axios.get('http://localhost:3001/users/1')
    .then(res => setFormValues(res.data))
    .catch(errors => console.log(errors))
  },[]);

  return (
    <form onSubmit={formik.handleSubmit} className="formSignUp">
      

      <Input formik={formik} name="name" label="Name"/>
      <Input formik={formik} name="email" label="Email"/>
      <Input formik={formik} name="phone" label="Phone"/>
      <Input formik={formik} name="password" label="Password" type="password"/>   
      <Input formik={formik} name="passwordConfirm" label="Password Confirm" type="password"/>

      
      <RadioInput formik={formik} name="gender" radioOptions={radioOptions}/>
      <SelectInput formik={formik} name="age" selectOptions={selectOptions}/>
      



      {/* <button onClick={() => setFormValues(savedData)}>Load Data</button> */}
      <button type="submit" disabled={!formik.isValid}>Submit</button>
    </form>
  );
};

export default SignUpForm;
