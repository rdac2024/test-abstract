"use client"

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getVwByPx } from "@/common/utils";

interface OTPInputProps {
    initValue?: string;
    className?: string;
    length: number;
    onChange: (otp: string) => void;
    type?: 'number' | 'text'
    isReferral?: boolean
}

const OTPInput: React.FC<OTPInputProps> = ({ initValue, isReferral, className, length, type = 'number', onChange }) => {
    const [ otp, setOtp ] = useState<string[]>(Array(length).fill(""));
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (initValue && initValue.length === length) {
            setOtp(initValue.split(''))
        }
    }, [initValue])

    useEffect(() => {
        if (inputs.current[0]) {
            inputs.current[0].focus();
        }
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        let value = element.value;
        if (type === 'number') {
            value = value.replace(/[^0-9]/g, "")
        }
        
        if (value.length > 1) {
            return;
        }

        const newOtp = [ ...otp ];
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(""));

        if (value !== "" && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const clipboardData = e.clipboardData.getData('text')
        let pasteData = clipboardData.split('');

        if (isReferral && clipboardData.startsWith(`${location.origin}?ref=`)) {
            pasteData = clipboardData.replace(`${location.origin}?ref=`, '').split('');
        }
        
        const newOtp = [...otp];

        pasteData.forEach((char, index) => {
            if (index < length) {
                newOtp[index] = char;
            }
        });

        setOtp(newOtp);
        onChange(newOtp.join(''));

        // Move focus to the last filled input
        const lastFilledIndex = Math.min(pasteData.length, length) - 1;
        inputs.current[lastFilledIndex]?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex justify-between vw-gap-12">
            { Array(length).fill("").map((_, index) => (
                <div key={ index } className="flex-1 relative otp-input-item" style={{ width: getVwByPx(40) }}>
                    <input
                        className={ cn("w-full text-center focus:outline-none focus:shadow-outline text-white vw-text-32", className) }
                        type={type}
                        lang="en"
                        inputMode={type === 'number' ? 'numeric' : 'text'}
                        maxLength={ 1 }
                        value={ otp[index] }
                        onChange={ (e) => handleChange(e.target as HTMLInputElement, index) }
                        onKeyDown={ (e) => handleKeyDown(e, index) }
                        onPaste={ handlePaste }
                        ref={ (element) => inputs.current[index] = element }
                        style={{
                            height: getVwByPx(62),
                            lineHeight: getVwByPx(62),
                            border: 0,
                            backgroundColor: 'transparent',
                        }}
                    />
                    <div className="bg-[#72638E] vw-h-4 w-full bottom-[0] left-[0]" style={{ pointerEvents: 'none' }}></div>
                </div>
            )) }
        </div>
    );
};

export default OTPInput;