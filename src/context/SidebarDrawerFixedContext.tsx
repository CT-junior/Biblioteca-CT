import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerFixedProviderProps {
    children: ReactNode;
}

type SiderbarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerFixedContext = createContext({} as SiderbarDrawerContextData);

export function SidebarDrawerFixedProvider({
    children,
}: SidebarDrawerFixedProviderProps) {
    const disclousure = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        disclousure.onClose()
    }, [router.asPath])
    
    return (
        <SidebarDrawerFixedContext.Provider value={disclousure}>
            {children}
        </SidebarDrawerFixedContext.Provider>
    );
}

export const useSidebarDrawerFixed = () => useContext(SidebarDrawerFixedContext);