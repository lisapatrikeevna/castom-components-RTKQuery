import { useState } from 'react';
import * as Uploader from './uploader.tsx';
import ImageCropperModal from '@/components/ui/imageUplouder/ImageCropperModal.tsx';
import { Button } from "@/components/ui/button";
import s from './styles.module.scss'
import { getRotatedImage, readFile } from "@/helpers.ts";

interface Props {
  buttonText:string
  onChange: (blob: Blob) => void
  url: string | Blob
}


const CroppedImageUploader = ({onChange, ...props}: Props) => {
  const [cropPicture, setCropPicture] = useState(false)
  const [url, setUrl] = useState(props.url || '')
  const [file, setFile] = useState({}as File)

  const imageSelected = async (file:File) => {
    let imageDataUrl = await readFile(file)
    console.log('imageSelected/file', file);
    try {
      // !!!!!!  apply rotation if needed  !!!!!!!
      // const orientation = await getOrientation(file)
      // const rotation = ORIENTATION_TO_ANGLE[orientation]
      // if( rotation ) {
      if( imageDataUrl ) {
        //!!! imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
        imageDataUrl = await getRotatedImage(imageDataUrl, 0)
      }
    } catch( e ) {
      console.warn('failed to detect the orientation')
    }

    setUrl(imageDataUrl)
    setFile(file)
    onChange(file)
  };

  const imageCropped = (blob: Blob) => {
    setUrl(blob)
    const fileImg = new File([blob], file.name, {type:file.type});
    console.log('imageCropped', fileImg);
    onChange(fileImg);
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
