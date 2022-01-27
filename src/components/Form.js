import React, { useState, useRef, useEffect } from 'react';

const Form = ({ onAdd, editInfo, setEditInfo }) => {

    const imageInputRef = useRef();
    let { profile, uploader } = useDisplayImage();
    const initialValues = { name: "", email: "", phone: "", photo: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    function useDisplayImage() {
        const [profile, setprofile] = useState("");

        function uploader(e) {
            const reader = new FileReader();
            reader.addEventListener("load", (e) => {
                setprofile(e.target.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
        
        return { profile, uploader };
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        if(editInfo) {
            setFormValues({
                name: editInfo.name,
                email: editInfo.email,
                phone: editInfo.phone,
                profile: editInfo.profile
            })
        }
    }, [editInfo])
    
    useEffect((u) => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if(editInfo.id) {
                onAdd(u, { id: editInfo.id, name: formValues.name, email: formValues.email, phone: formValues.phone, profile })    
                setEditInfo({})
            } else onAdd(u, { name: formValues.name, email: formValues.email, phone: formValues.phone, profile })

            imageInputRef.current.value = '';
            setFormValues(initialValues)
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const regexName = '^[a-zA-Z ]*$';
        const regexSymbols = /[^a-zA-Z0-9]/g;
        const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexNum = /[0-9]/g;

        if (!values.name) errors.name = "Name is required!"
        else if ((values.name).match(regexName) === null) errors.name = "Please Enter Valid Name"

        if (!values.email) errors.email = "Email is required!";
        else if (!regexMail.test(values.email)) errors.email = "Please enter valid mail"

        if (!values.phone) errors.phone = "Phone number is required";
        else if (values.phone.length !== 10 || !regexNum.test(values.phone) || (values.phone).match(regexName) !== null  || regexSymbols.test(values.phone)) {
            errors.phone = "Please enter valid phone number"
        }

        if(!values.photo) errors.photo = "Please upload profile photo"
        
        return errors;
    };


    return (
        <form action="#FIXME" id="empForm" onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" id="name" value={formValues.name} onChange={handleChange} />
                <span className="error nameErr">{formErrors.name}</span>
            </div>
            <div>
                <label>Email:</label>
                <input type="text" name="email" id="email" value={formValues.email} onChange={handleChange}/>
                <span className="error emailErr">{formErrors.email}</span>
            </div>
            <div>
                <label>Phone:</label>
                <input type="text" name="phone" id="phone" value={formValues.phone} onChange={handleChange} />
                <span className="error phoneErr">{formErrors.phone}</span>
            </div>
            <div>
                <label>Profile Image:</label>
                <input type="file" id="file" name="photo" accept="image/*" ref={imageInputRef} onChange={(e) => {
                    uploader(e)
                    handleChange(e)
                }} />
                <span className="error profileErr">{formErrors.photo}</span>
            </div>
            { editInfo.profile ? <img src={editInfo.profile} alt="Demo Image" className="editImg" /> : '' }
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
