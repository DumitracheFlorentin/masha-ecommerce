import { Alert } from "react-bootstrap"

export default function CustomAlert({ message, color }) {
  return <Alert variant={color}>{message}</Alert>
}
