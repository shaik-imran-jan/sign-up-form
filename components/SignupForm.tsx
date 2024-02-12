// SignupForm.tsx
import React,{useState} from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

interface FormField {
  id:number,
  name: string;
  fieldType: string;
  minLength?:number,
  maxLength?:number,
  defaultValue:any,
  required:boolean,
  listOfValues1?:string[],
  fieldName?:string

}

interface SignupFormProps {
  formFields: FormField[];
  onSubmit: SubmitHandler<FieldValues>;
}

const SignupForm: React.FC<SignupFormProps> = ({ formFields, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleInputValue = (index) => (e) =>{
    formFields[index].defaultValue = e.target.value;
    const{name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  }


  const handleSubmit = (e)=>{
    e.preventDefault();
    let values = {};
    for(let i=0; i < e.target.length; i++){
      let {name, value, type, checked} = e.target[i];
      if(type == "radio"){
        if(checked){
        values[name] = value;
        }
      }else
      if(name){
        values[name] = value;
      }
    }
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field, fieldIndex) => (
        <div key={field.name} style={{ marginBottom: '15px' }}>
          <label>{field.name}</label>
          {field.fieldType === 'LIST' ? (
            <select onChange={handleInputValue(fieldIndex)}  name={field?.fieldName} defaultValue={field?.defaultValue} required={field.required}>
              {field.listOfValues1?.map((option, key) => (
                <option key={option} value={key}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.fieldType === 'TEXT' ?  (
            <input type={field.fieldType} required={field.required} min-length={field?.minLength}  max-length={field?.maxLength} name={field?.fieldName}  defaultValue={field?.defaultValue}  onChange={handleInputValue(fieldIndex)} />
          ):(
            <div>
                {field.listOfValues1.map((option, key) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={field?.fieldName}
                    value={key}
                    defaultChecked={field?.defaultValue == key}
                    required={field.required}
                    onChange={handleInputValue(fieldIndex)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
