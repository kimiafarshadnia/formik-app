import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import axios from "axios";
import { useEffect } from "react";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import SelectInput from "./common/SelectInput";
import CheckBoxInput from "./common/CheckBoxInput";
import TermsInput from "./common/TermsInput";
//1

// const savedData = {
//   name: "kimia",
//   email: "farshadniakimia@gmail.com",
//   phone:"09134246753",
//   gender:"1",
//   password: "Kimia12#",
//   passwordConfirm:"Kimia12#",
// };

const checkBoxOptions =[
  {label:"cindrella", value:"cindrella"},
  {label:"snowwhite", value:"snowwhite"},
  {label:"frozen", value:"frozen"},
  {label:"mickymouse", value:"mickymouse"},
]

const radioOptions =[
  {label:"Male", value:"0"},
  {label:"Female", value:"1"}
]

const selectOptions =[
  {label:"select your country ...", value:""},
  {label:"Iran", value:"children"},
  {label:"usa", value:"teencountryr"},
  {label:"use", value:"young"},
  {label:"france", value:"midelcountry"},
]

const initialValues = {
  name: "",
  email: "",
  phone:"",
  gender:"",
  country:"",
  password: "",
  passwordConfirm:"",
  intrests:[],
  terms: false
};

//2
const onSubmit = (values) => {
  console.log({...values, newData: "6 may 2022"});
  axios.post("http://localhost:3001/users", values)
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
};

//3
const validationSchema = Yup.object({
  name : Yup.string().required("name is required"),
   
  email : Yup.string().email("Invalid email format").required("Email is required"),
  
  phone: Yup.string().required("phone number is required").matches(/^[0-9]{11}$/,"Invalid phone number ").nullable(),

  gender: Yup.string().required('Gender is required'),

  country: Yup.string().required('country is required'),

  password : Yup.string().required("Password is required").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ), 

  passwordConfirm: Yup.string().required(" password confirmation is required")
  .oneOf([Yup.ref('password'), null], 'Passwords must match'),

  intrests: Yup.array().min(1).required(" at least select one expertise"),

  terms: Yup.boolean().required("the terms and conditions must be accepted")
  .oneOf([true],"the terms and conditions must be accepted")
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
      <SelectInput formik={formik} name="country" selectOptions={selectOptions}/>
      
      <CheckBoxInput formik={formik} name="intrests" checkBoxOptions={checkBoxOptions}/>

     <TermsInput formik={formik} />

      {/* <button onClick={() => setFormValues(savedData)}>Load Data</button> */}
      <button type="submit" disabled={!formik.isValid}>Submit</button>
    </form>
  );
};

export default SignUpForm;
