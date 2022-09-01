import { CreateToastFnReturn, UseToastOptions, Text } from "@chakra-ui/react"

export const fireAuthErrorToast = (chackraToast: CreateToastFnReturn, error: string | string[]) => {
    const options: UseToastOptions = {
        status: "error",
        variant: "left-accent",
        containerStyle: {
            paddingBottom: "180px"
        },
        duration: 9000,
        isClosable: true
    }

    if (error === 'AccessDenied') {
        options.description = (
          <Text>
            O email não é do domínio da <Text as={'strong'}>CT Junior</Text>
          </Text>
        )
    }
    else {
        options.title = error
        options.description = "Um erro inesperado ocorreu. Tente novamente."
    }
    
    chackraToast(options)
}
