import { FormLabel, FormControl, Input, VStack, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickPassword = () => setShowPassword(!showPassword);
    const Toast = useToast();
    const history = useNavigate();
    const submitHandler = async() => {
        if(!email || !password) {
            Toast({
                title:"Please fill all the fields",
                status:"warning",
                duration:5000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }
        try {
            const config = {
                headers: {
                "Content-type": "application/json",
                }
            }
            const response = await axios.post(
                "https://reqres.in/api/login",
                { email, password },
                config
            )
            Toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            console.log(response.data.token);
            localStorage.setItem("userInfo", JSON.stringify(response.data.token));
            history("/usersPage")
            } catch(err) {
                Toast({
                title: "Error Occured!",
                description: err.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
                });
            }
    }
    return (
        <VStack spacing = '5px'>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                    placeholder = 'Enter your email'
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem" >
                        <Button h = "1.75rem" size="sm" onClick={handleClickPassword} bg={"lightcyan"}>
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        <Button bgColor='powderblue'
        width='100%'
        color={'black'}
        style={{marginTop : 15}}
        onClick={submitHandler}
        >
            Login
        </Button>
        </VStack>
    )
}

export default Login