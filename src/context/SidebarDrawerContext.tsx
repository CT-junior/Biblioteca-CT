import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps {
    children: ReactNode;
}

type SiderbarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SiderbarDrawerContextData);

export function SidebarDrawerProvider({
    children,
}: SidebarDrawerProviderProps) {
    const disclousure = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        disclousure.onClose()
    }, [router.asPath])
    
    return (
        <SidebarDrawerContext.Provider value={disclousure}>
            {children}
        </SidebarDrawerContext.Provider>
    );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);