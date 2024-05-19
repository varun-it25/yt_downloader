import { Text, Input, Box, Button, HStack, VStack, Image, Menu, MenuList, MenuItem, MenuButton  } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const[video, setVideo] = useState(false);
  const[input, setInput] = useState(true);
  const[inputValue, setInputValue] = useState('');
  const[c_Name, setC_Name] = useState('');
  const[title, setTitle] = useState('');
  const[imgSrc, setImgSrc] = useState('');
  let apiData = useRef([])
  let links = useRef([])
  let link = useRef([])

  useEffect(()=>{
    const inputs = document.getElementsByClassName('myInput');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          console.log('Enter key pressed!');
        }
      });
    }
},[])

  const options = {
    method: 'GET',
    url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
    params: {
      url: `${inputValue}`,
      filename: 'video'
    },
    headers: {
      'X-RapidAPI-Key': '0a04e52735msh7512308f717cd93p14beebjsn7edc0b8312fd',
      'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
    }
  };

  async function callApi(){
    const response = await axios.request(options);
    apiData.current = response.data
    links.current = apiData.current.links
    setImgSrc(apiData.current.picture)
    setTitle(apiData.current.title)
    setC_Name(apiData.current.author.name)

    for(let i=0; i<(links.current).length; i++){
      if(links.current[i]['quality'].includes('1080')){
        console.log('1080 Found...')
        link.current = links.current[i].link;
        break;
      }
    }

    console.log(links.current)
    console.log(apiData.current)
    setInputValue('')
  }  

  function download(){
    window.open(link.current, "_blank");
  }

  function valueSetter(){
    if(input){
      setInput(false)
    }
    else{
      setInput(true)
    }
    if(video){
      setVideo(false)
    }
    else{
      setVideo(true)
    }
  }

  return (
    <Box className="App" px={16}>
      <VStack w="100%">
        <HStack w="100%" spacing={0}>
          <Input value={inputValue} className="myInput" onChange={(e)=>setInputValue(e.target.value)} display={(input)? '': 'none'} placeholder='Enter a Youtube Video Link' borderRightRadius={0}/>
          <Button display={(input)? '': 'none'} borderLeftRadius={0} onClick={()=>{
            valueSetter();
            callApi();
          }} border='1px solid #fff' marginLeft={'-1px'} colorScheme='red'>Search</Button>
        </HStack>
        <HStack px={4} display={(!video)? 'none': 'flex'} w={'100%'} border='1px solid #fff' borderRadius={4} mt={4} spacing={4}>
          <Image w={'50%'} src={`${imgSrc}`} />
          <VStack w={'50%'} spacing={0} py={4}>
            <Text w={'100%'} mt={-2} fontSize={20}>{title}</Text>
            <Text w={'100%'} fontWeight={'bold'} fontSize={20}>Channel Name: {c_Name}</Text>                       
            <HStack w={'100%'} spacing={4} my={4}>
              <Button colorScheme='red' onClick={download}>Download Video</Button> 
            </HStack>
            <Button w={'100%'} colorScheme='red' onClick={valueSetter}>Convert Next</Button> 
          </VStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default App