import { useSearchParams } from 'react-router-dom';
import { useAppSelector,useAppDispatch } from '@store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { resetUI } from '@store/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema,signInType } from '@validations/signInSchema';
import { Heading } from "@components/common";
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Alert,Spinner} from "react-bootstrap";
import { Input } from '@components/Form';
import { actAuthLogin } from '@store/auth/authSlice';
const Login = () => {
  const [searchParam,setSerchParam] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

const {error,loading,accessToken}=useAppSelector(state=>state.auth)
  const { register, handleSubmit, formState: { errors } } = useForm<signInType>(
    {
      mode:'onBlur',
      resolver:zodResolver(signInSchema)
    }
  );

  const submitForm: SubmitHandler<signInType> = async (data) => {
    if (searchParam.get('message')) {
      setSerchParam('')
    }

    dispatch(actAuthLogin(data)).unwrap().then(() => {
      navigate('/')
    })
    
  }

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  if (accessToken) {
    return <Navigate to="/" />;
  }
  return <>
    <Heading title="user Log in" />
    

    <Row>
      <Col md={{ span: 6, offset: 3 }}>

        {searchParam.get("message") === 'account_created' && <Alert variant="success" >
          Your account successfully created,please login
        </Alert>}

   
        

        <Form onSubmit={handleSubmit(submitForm)}>
          
        <Input type='email' label='Email' name='email' register={register} error={errors.email?.message} />


    <Input type='password' label='password' name='password' register={register} error={errors.password?.message} />

          <Button variant="info" type="submit" style={{ color: 'white' }}>

          {loading === 'pending' ?
              
              <>
                <Spinner animation="border" size="sm" ></Spinner>
                
                loading...

              </>
              
              
              
              : "sumbit"}


          </Button>


          
          {error && <p style={{color:'red',marginTop:'10px'}}>{error}</p>}
          
</Form>
      
      </Col>


    </Row>



  </>
};

export default Login;
