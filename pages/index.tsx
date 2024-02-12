// pages/index.tsx
import React,{ useState } from 'react';
import SignupForm from '../components/SignupForm';
import formFields from '../formFields.json';
import { useForm } from 'react-hook-form';

const Home: React.FC = () => {
  const { handleSubmit, setValue } = useForm();
  const [dynamicFormFields, setFieldsData] = useState(formFields);


  const onSubmit = (data: any) => {
    console.log('Form data submitted:', data);
    // Handle form submission logic here
  };


  return (
    <div>
      <h1>Signup Form</h1>
      <SignupForm formFields={dynamicFormFields.data} onSubmit={onSubmit} />
    </div>
  );
};

export default Home;
