"use client";
import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";
import { toast, useToast } from "@/hooks/use-toast";

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndPoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Error authenticating user: ${error}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const {
    env: {
      imageKit: { publicKey, urlEndpoint },
    },
  } = config;

  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);


  const onError = (error: any) => {
    console.error("Error uploading file", error);
    toast({
      title: "Error uploading file",
      description: "Error uploading file",
    });
  };
  const onSuccess = (data: any) => {
    console.log("File uploaded successfully", data);
    setFile(data);
    onFileChange(data.filePath);
    toast({
      title: "File uploaded successfully",
      description: `${data.filePath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={IKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="filetest.png"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          // @ts-ignore
          if (IKUploadRef.current) IKUploadRef.current?.click();
        }}
      >
        <Image
          src={"/icons/upload.svg"}
          alt="upload"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className="text-base text-light-100">Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          path={file.filePath}
          alt="uploaded file"
          lqip={{ active: true }}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
