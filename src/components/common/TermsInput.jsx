const TermsInput = ({formik}) => {
    return ( 
        <div>
             <input type="checkbox"
                name="terms"
                id="terms"
                value={true}
                onChange={formik.handleChange} 
                checked={formik.values.terms}
            />
            <label htmlFor="terms">agrea</label>
            {formik.errors.terms && formik.touched.terms && (
                <div className="error">{formik.errors.terms}</div>
            )}
        </div>
     );
}
 
export default TermsInput;