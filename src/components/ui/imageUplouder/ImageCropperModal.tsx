import { useEffect, useState } from 'react';
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop";
import s from './styles.module.scss'
import { Slider } from "@material-ui/core";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { getCroppedImg } from "@/helpers.ts";


type propsType = {
  onOk: (image:any) => void
  closeModal: (close: boolean) => void
  image: string
}
//https://codesandbox.io/p/sandbox/react-easy-crop-custom-image-demo-y09komm059?file=%2Fsrc%2Findex.js%3A49%2C9-49%2C21


const ImageCropperModal = ({onOk, closeModal, image}: propsType) => {
  const [blobUrl, setBlobUrl] = useState<string | Blob>('');
  const [crop, setCrop] = useState<Point>({x: 0, y: 0});
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | Area>(null)
  const [croppedImage, setCroppedImage] = useState(null)

  useEffect(()=>{setBlobUrl(image)},[])
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const saveChanges = async() => {
    try {
      const croppedImage = await getCroppedImg(blobUrl, croppedAreaPixels, rotation)
      // setCroppedImage(croppedImage)
      if( croppedImage ) {
        onOk(croppedImage)
        closeModal(false)
      }
    } catch( e ) {
      console.error(e);
    }
  };



  return (<>
    <div className={s.cropContainer}>
      <h3>Select part of image</h3>
      <Cropper image={blobUrl} crop={crop} rotation={rotation} zoom={zoom} aspect={4 / 3} onCropChange={setCrop} onRotationChange={setRotation} onCropComplete={onCropComplete} onZoomChange={setZoom}/>
      <div className={s.sliderContainer}>
        <Typography variant="overline" className={s.sliderLabel}>
          Zoom
        </Typography>
        <Slider value={zoom} min={1} max={3} step={0.1} aria-labelledby="Zoom" onChange={(e, zoom) => setZoom(Number(zoom))} className={"slider"}/>
      </div>
      <div className={s.sliderContainer}>
        <Typography variant="overline" className={s.sliderLabel}>
          Rotation
        </Typography>
        <Slider value={rotation} min={0} max={360} step={1} aria-labelledby="Rotation" className={s.slider} onChange={(e, rotation) => setRotation(rotation)}/>
      </div>
      <Button onClick={saveChanges} className={s.saveCropBtn}>saveChanges</Button>
    </div>
  </>);
};

export default ImageCropperModal;




