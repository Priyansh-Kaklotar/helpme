"use client";
import React, { useRef, useState } from 'react';

const OTPInput = ({ length = 6, onComplete }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus on the next input
        if (element.value !== '' && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        // Call onComplete if all digits are entered
        if (newOtp.every(digit => digit !== '')) {
            onComplete(newOtp.join(''));
        }
    };

    const handleKeyDown = (e, index) => {
        // Move focus to previous input on backspace if current is empty
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <>
        
            <div className='flex gap-5'>
                {otp.map((data, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={data}
                        onChange={e => handleChange(e.target, index)}
                        onKeyDown={e => handleKeyDown(e, index)}
                        ref={el => (inputRefs.current[index] = el)}
                        style={{
                            width: '40px',
                            height: '40px',
                            textAlign: 'center',
                            fontSize: '1.2rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                        className='focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-purple-500'
                    />
                ))}
            </div>
        </>
    );
};

export default OTPInput;