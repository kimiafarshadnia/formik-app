import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
//1

const savedData = {
  name: "kimia",
  email: "farshadniakimia@gmail.com",
  phone:"09134246753",
  gender:"1",
  password: "Kimia12#",
  passwordConfirm:"Kimia12#",
};


const initialValues = {
  name: "",
  email: "",
  phone:"",
  gender:"",
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
  return (
    <form onSubmit={formik.handleSubmit} className="formSignUp">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
         {...formik.getFieldProps("name")}
          name="name"
          id="name"
        />
        {formik.errors.name && formik.touched.name && (
          <div className="error">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...formik.getFieldProps("email")}
          name="email"
          id="email"
        />{" "}
        {formik.errors.email && formik.touched.email && (
          <div className="error">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <input type="radio" name="gender" id="0" value="0" onChange={formik.handleChange} checked={formik.values.gender === "0"}/>
        <label htmlFor="0">Male</label>

        <input type="radio" name="gender" id="1" value="1" onChange={formik.handleChange}  checked={formik.values.gender === "1"}/>
        <label htmlFor="1">Female</label>

        {formik.errors.gender && formik.touched.gender && (
          <div className="error">{formik.errors.gender}</div>
        )}
      </div>

      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          {...formik.getFieldProps("phone")}
          name="phone"
          id="phone"
        />{" "}
        {formik.errors.phone && formik.touched.phone && (
          <div className="error">{formik.errors.phone}</div>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...formik.getFieldProps("password")}
          name="password"
          id="password"
        />
        {formik.errors.password && formik.touched.password && (
          <div className="error">{formik.errors.password}</div>
        )}
      </div>

      <div>
        <label htmlFor="passwordConfirm">Password Confirmation </label>
        <input
          type="password"
          {...formik.getFieldProps("passwordConfirm")}
          name="passwordConfirm"
          id="passwordConfirm"
        />
        {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
          <div className="error">{formik.errors.passwordConfirm}</div>
        )}
      </div>

      <button onClick={() => setFormValues(savedData)}>Load Data</button>
      <button type="submit" disabled={!formik.isValid}>Submit</button>
    </form>
  );
};

export default SignUpForm;
