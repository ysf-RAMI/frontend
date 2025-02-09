import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddUser = async (values) => {
    const toastId = toast.loading("Waiting...");
    const newUser = {
      user_id: uuidv4(),
      full_name: values.full_name,
      email: values.email,
      password: values.password,
    };


    try {
      const option = {
        url: "http://localhost:8081/users/add-user",
        method: "POST",
        data: newUser,
      };

      if (newUser.full_name.length < 4) {
        // Fixed 'lenght' to 'length'
        toast.error("This name is not accepted");
      } else {
        const { data } = await axios(option);
        toast.dismiss(toastId);
        console.log(data);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to add user");
      console.error(error);
    }
  };

  return (
    <>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f4f4f9",
        }}
      >
        <Box
          sx={{
            width: "40%",
            padding: "25px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            bgcolor: "#fff",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "#5a189a" }}
          >
            Add User
          </Typography>
          <hr style={{ border: "1px solid #ddd" }} />
          <form onSubmit={handleSubmit(handleAddUser)}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              id="full_name"
              {...register("full_name", {
                required: "Full Name is required",
                minLength: {
                  value: 4,
                  message: "Must be at least 4 characters",
                },
              })}
              error={!!errors.full_name}
              helperText={errors.full_name?.message}
              variant="outlined"
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              id="age"
              {...register("email")}
              type="email"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              id="password"
              {...register("password")}
              type="password"
              required
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: "#5a189a",
                color: "#fff",
                ":hover": { bgcolor: "#3c096c" },
              }}
            >
              Add User
            </Button>
          </form>
        </Box>
      </div>
    </>
  );
}
