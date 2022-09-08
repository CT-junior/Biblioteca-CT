import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    colors: {
        orange:{
            "ct": "#FE6A01",
        },
     },
     fonts: {
         heading: 'Montserrat',
         body: 'Montserrat'
     },
 
     styles: {
        global: {
            body:{
                bg: 'white',
                color: 'gray.900'
            }
        } 
     }
})