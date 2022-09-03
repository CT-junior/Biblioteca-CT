import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerTempProviderProps {
    children: ReactNode;
}

type SiderbarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerTempContext = createContext({} as SiderbarDrawerContextData);

export function SidebarDrawerTempProvider({
    children,
}: SidebarDrawerTempProviderProps) {
    const disclousure = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        disclousure.onClose()
    }, [router.asPath])
    
    return (
        <SidebarDrawerTempContext.Provider value={disclousure}>
            {children}
        </SidebarDrawerTempContext.Provider>
    );
}

export const useSidebarDrawerTemp = () => useContext(SidebarDrawerTempContext);