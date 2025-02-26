import { Container } from "@mui/joy";
import BasicForm from "../Components/Apropos/BasicForm";

export function AboutPage() {
  return (
    <Container maxWidth="md" className="main-content" style={{ marginTop: "100px", marginBottom: "30px" }}    >
      <BasicForm />
    </Container>
  );
}
