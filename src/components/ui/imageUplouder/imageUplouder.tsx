import { useState } from 'react';
import * as Uploader from './uploader.tsx';
import ImageCropperModal from '@/components/ui/imageUplouder/ImageCropperModal.tsx';
import { Button } from "@/components/ui/button";
import s from './styles.module.scss'

interface Props {
  buttonText:string
  onChange: (blob: Blob) => void
  url: string | Blob
}


const CroppedImageUploader = ({onChange, ...props}: Props) => {
  const [cropPicture, setCropPicture] = useState(false)
  const [url, setUrl] = useState(props.url || '')

  const imageSelected = (image:any) => {
    setUrl(image)
      onChange(image)
  };

  const imageCropped = (blob: Blob) => {
    setUrl(blob)
    onChange(blob);
  };
  const closeHandlerModal = (value: boolean) => {
    setCropPicture(value)
  }


  return (<>
    <Uploader.FileUploader fileType={Uploader.FileType.IMAGE} resetOnClick fileSelected={imageSelected} url={props.url} buttonText={props.buttonText}/>
    {url && <div className={s.fileUploaderWrap}>
    <div className={s.imageContainer}><img src={url} alt='uploudet image'/></div>
      <Button onClick={() => setCropPicture(!cropPicture)}>Crop picture</Button>
    </div>}

    {cropPicture && <ImageCropperModal image={url} onOk={imageCropped} closeModal={closeHandlerModal}/>}
  </>);
};

export default CroppedImageUploader;
