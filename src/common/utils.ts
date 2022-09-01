import { CreateToastFnReturn, UseToastOptions } from "@chakra-ui/react"

export const fireErrorToast = (chackraToast: CreateToastFnReturn, options?: UseToastOptions) => {
    if (options?.id && chackraToast.isActive(options.id)) { // error is a valid toadId
        return
    }

    chackraToast({
        status: "error",
        variant: "left-accent",
        containerStyle: {
            marginBottom: "180px",
            marginTop: "-164px"
        },
        duration: 9000,
        isClosable: true,
        ...options
    })
}
