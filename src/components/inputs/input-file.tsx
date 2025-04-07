'use client';

import { useEffect, useRef, useState } from 'react';

import { Input } from '@/shadcn/input';

import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

export type InputFieldProps<T extends FieldValues> = {
    name: Path<T>;
    field: ControllerRenderProps<T, Path<T>>;
    placeholder: string;
    placeholderClassName?: string;
};

export default function InputFile<T extends FieldValues>({
    name,
    field,
    placeholder,
    placeholderClassName,
    ...rest
}: InputFieldProps<T>) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Clean up URL object when component unmounts or preview changes
    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    // Update preview when field value changes (e.g., from form reset)
    useEffect(() => {
        // Check if field.value is a File object by checking its properties
        if (
            field.value &&
            typeof field.value === 'object' &&
            'name' in field.value &&
            'size' in field.value &&
            'type' in field.value
        ) {
            const imageUrl = URL.createObjectURL(field.value as File);
            setPreviewImage(imageUrl);
        } else if (!field.value) {
            setPreviewImage(null);
        }
    }, [field.value]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Revoke previous URL if exists
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            field.onChange(file);
        }
    };

    return (
        <div className='relative cursor-pointer' onClick={handleImageClick}>
            <Input id={name} type='file' className='hidden' ref={fileInputRef} onChange={handleFileChange} {...rest} />
            <div className={placeholderClassName} onClick={handleImageClick}>
                {previewImage ? (
                    <img src={previewImage} alt='Profile preview' className='h-full w-full object-cover' />
                ) : (
                    <div className='relative h-full w-full'>
                        <img src={placeholder} alt='Placeholder' className='h-full w-full object-cover' />
                    </div>
                )}
            </div>
        </div>
    );
}
