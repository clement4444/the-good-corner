import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface InputCategorie {
  nom: string;
}

const Admin = () => {
  // const { register, handleSubmit } = useForm<InputCategorie>();

  // const onSubmit: SubmitHandler<InputCategorie> = async (data) => {
  //   try {
  //     const response = await axios.post("http://localhost:8000/api/admin", data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <label>
    //     <input {...register("nom", { required: true })} />
    //   </label>
    // </form >
    <p>Prochainement...</p>
  );
};

export default Admin;