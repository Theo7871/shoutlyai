"use client";

import { useState } from "react";
import NextImage, { type ImageProps } from "next/image";

export default function FadeImage({ className = "", ...props }: ImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <NextImage
            {...props}
            className={`${className} transition-opacity duration-500 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={(e) => {
                setLoaded(true);
                props.onLoad?.(e);
            }}
        />
    );
}
