"use client"
import StateProvider from "./state/state";

export default function RootTemplate( { children } )
{
    return (
        <StateProvider>
            {children}
        </StateProvider>
    );
}
