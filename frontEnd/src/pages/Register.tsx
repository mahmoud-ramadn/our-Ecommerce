import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister } from "@store/auth/authSlice"
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Heading } from "@components/common";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpType } from "@validations/signUpSchema";
import { Input } from "@components/Form";
import useCheckEmailAvailbility from "@hooks/useCheckEmailAvailbility";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {error,loading,accessToken}=useAppSelector((state)=>state.auth)

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const {
    CheckEmailAvailbility,
    enteredEmail,
    emailAvailabilityStatus,
    restCheckEmailAvailabiliity,
  } = useCheckEmailAvailbility();

  const submitForm: SubmitHandler<signUpType> = async(data) => {
     const {FirstName,LastName,email,password}=data
    dispatch(actAuthRegister({ FirstName, LastName, email, password })).unwrap().then(() => {
      navigate('/login?message=account_created')
    })
  };

  const emalOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail != value) {
      CheckEmailAvailbility(value);
    }
    if (enteredEmail && invalid && isDirty) {
      restCheckEmailAvailabiliity();
    }
  };
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Heading title="User Register" />

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              type="text"
              label="First name"
              name="FirstName"
              register={register}
              error={errors.FirstName?.message}
            />

            <Input
              type="text"
              label="Last name"
              name="LastName"
              register={register}
              error={errors.LastName?.message}
            />
            <Input
              type="email"
              label="Email"
              name="email"
              register={register}
              onBlur={emalOnBlurHandler}
              error={
                errors.email?.message
                  ? errors.email.message
                  : emailAvailabilityStatus === "notAvailbale"
                    ? "this email is already in use"
                    : emailAvailabilityStatus==='failed'? "Error from server.": ""
              }
              formText={
                emailAvailabilityStatus === "checking"
                  ? " we 're currently checing the availbility of this email address. please wait a moment "
                  : " "
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "this email is availbabl to use"
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
              
              
            />

            <Input
              type="password"
              label="password"
              name="password"
              register={register}
              error={errors.password?.message}
            />

            <Input
              type="password"
              label="confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword?.message}
            />

            <Button variant="info" type="submit" style={{ color: "white" }}
              disabled={emailAvailabilityStatus === 'notAvailbale' ? true : false || 

                loading==='pending' 
                
                
              }
            >

              {loading === 'pending' ?
              
                <>
                  <Spinner animation="border" size="sm" ></Spinner>
                  
                  loading...

                </>
                
                
                
                : "sumbit"}
              
            </Button>
            {error && <p style={{ color:'red'}}>{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
