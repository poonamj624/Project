import { useState, useEffect } from 'react';
import './App.css';
// import ReactDOM from 'react-dom/client';

export const Form = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    email: '',
    gender: '',
    state: '',
    date: '',
    saveInfo: false
  };


  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    const validateForm = () => {
      let valid = true;
      const newErrors = {};

      if (!formData.firstName.trim() || formData.firstName.trim().length < 2 || !/^[a-zA-Z]+$/.test(formData.firstName)) {
        newErrors.firstName = 'Only alphabets are allowed with minimum 2 characters.';
        valid = false;
      }

      if (!formData.lastName.trim() || formData.lastName.trim().length < 2 || !/^[a-zA-Z]+$/.test(formData.lastName)) {
        newErrors.lastName = 'Only alphabets are allowed with minimum 2 characters.';
        valid = false;
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
        valid = false;
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
        newErrors.password = 'Password should be at least 8 characters long and include 1 uppercase character, 1 digit, and 1 special character.';
        valid = false;
      }

      if (!formData.phoneNumber.trim() || formData.phoneNumber.trim().length !== 10 || !/^[789]\d{9}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Phone number should be exactly 10 digits starting with 7, 8, or 9.';
        valid = false;
      }

      if (!formData.email.trim() || !/^[a-zA-Z0-9._]+@[a-zA-Z]+\.[cC][oO][mM]$/.test(formData.email)) {
        newErrors.email = 'Email address must be valid (e.g., example@example.com).';
        valid = false;
      }

      if (!formData.gender) {
        newErrors.gender = 'Please select your gender.';
        valid = false;
      }

      if (!formData.state) {
        newErrors.state = 'Please select your state.';
        valid = false;
      }

      if (!formData.date) {
        newErrors.date = 'Please select your date of birth.';
        valid = false;
      } else {
        const selectedDate = new Date(formData.date);
        const currentDate = new Date();
        if (selectedDate > currentDate) {
          newErrors.date = 'Date of birth cannot be in the future.';
          valid = false;
        }
      }

      setErrors(newErrors);
      setIsFormValid(valid);
    };

    validateForm();
  }, [formData]);



  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
    setTouchedFields(prevState => ({
      ...prevState,
      [name]: true
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    if (formData.saveInfo) {
      localStorage.setItem('formData', JSON.stringify(formData));
    } else {
      localStorage.removeItem('formData');
    }

    // Reset form state
    setFormData(initialFormData);
    setErrors({});
    setIsFormValid(false);
    setTouchedFields({});
  };


  return (
    <div className="background-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={() => setTouchedFields(prevState => ({ ...prevState, firstName: true }))}
              />
              {touchedFields.firstName && errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={() => setTouchedFields(prevState => ({ ...prevState, lastName: true }))}
              />
              {touchedFields.lastName && errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => setTouchedFields(prevState => ({ ...prevState, password: true }))}
              />
              {touchedFields.password && errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => setTouchedFields(prevState => ({ ...prevState, confirmPassword: true }))}
              />
              {touchedFields.confirmPassword && errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={() => setTouchedFields(prevState => ({ ...prevState, phoneNumber: true }))}
                pattern="[0-9]{10}"
              />
              {touchedFields.phoneNumber && errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => setTouchedFields(prevState => ({ ...prevState, email: true }))}
              />
              {touchedFields.email && errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                    checked={formData.gender === 'male'}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                    checked={formData.gender === 'female'}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    onChange={handleChange}
                    checked={formData.gender === 'other'}
                  />
                  Other
                </label>
              </div>
              {touchedFields.gender && errors.gender && <span className="error">{errors.gender}</span>}
            </div>

            <div className="form-group">
              <label>State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                onBlur={() => setTouchedFields(prevState => ({ ...prevState, state: true }))}
              >
                <option>Select state</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
                <option>Punjab</option>
                <option>Madhya Pradesh</option>
                <option>Chennai</option>
              </select>
              {touchedFields.state && errors.state && <span className="error">{errors.state}</span>}
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                onBlur={() => setTouchedFields(prevState => ({ ...prevState, date: true }))}
              />
              {touchedFields.date && errors.date && <span className="error">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                /> Save Information
              </label>
            </div>

            <div className="form-group">
              <button type="submit" disabled={!isFormValid}>Submit</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Form;
