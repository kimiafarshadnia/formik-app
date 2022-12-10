import React from "react";
const SelectInput = ({ name, formik, selectOptions}) => {
    return (  <div>
        <select {...formik.getFieldProps(name)} name={name}>
        {
         selectOptions.map((item)=>(
             <option key={item.value} value={item.value}>
                {item.label}
             </option>
         ))
        }
        </select>
         {formik.errors[name] && formik.touched[name] && (
           <div className="error">{formik.errors[name]}</div>
         )}
       </div> );
}
 
export default SelectInput;