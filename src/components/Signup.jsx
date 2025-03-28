import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const Toast = useToast();
    const history = useNavigate();
    const handleClickPassword = () => setShowPassword(!showPassword);
    const submitHandler = () => {
        if(!email || !password) {
            Toast({
              title: "Please fill all the fields",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: 'bottom',
            })
            return;
          }
          history("/usersPage");
    }
    return (
        <VStack spacing='5px'>
            <FormControl id='email' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword? "text" : "password"} 
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
                Signup
            </Button>
        </VStack>
    )
}

export default Signup