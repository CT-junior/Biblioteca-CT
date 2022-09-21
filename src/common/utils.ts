import { CreateToastFnReturn, UseToastOptions } from "@chakra-ui/react";

const fireErrorToast = (
    chackraToast: CreateToastFnReturn,
    options?: UseToastOptions
) => {
    if (options?.id && chackraToast.isActive(options.id)) {
        // error is a valid toadId
        return;
    }

    chackraToast({
        status: "error",
        variant: "left-accent",
        containerStyle: {
            marginBottom: "180px",
            marginTop: "-164px",
        },
        duration: 9000,
        isClosable: true,
        ...options,
    });
};

const colorSchemeOrangeCt = {
    bg: "orange.ct",
    color: "white",
    _hover: {
        bg: "orange.500",
    },
    _active: {
        bg: "orange.600",
    },
};

const colorSchemeOrangeCtOutline = {
    color: "orange.ct",
    _placeholder: {
        color: "orange.ct",
    },
    borderColor: "orange.ct",

    _focus: {
        borderColor: "orange.ct",
        shadow: "none",
    },

    _hover: {
        bg: "orange.50",
    },

    _active: {
        bg: "orange.100",
    },
};

export { fireErrorToast, colorSchemeOrangeCt, colorSchemeOrangeCtOutline };
