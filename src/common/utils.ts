import { CreateToastFnReturn, UseToastOptions } from "@chakra-ui/react"
import { ReactNode } from "react"

export const fireAuthErrorToast = (chackraToast: CreateToastFnReturn, options?: UseToastOptions | undefined) => {
    chackraToast({
        status: "error",
        variant: "left-accent",
        containerStyle: {
            paddingBottom: "180px"
        },
        duration: 9000,
        isClosable: true,
        ...options
    })
}
