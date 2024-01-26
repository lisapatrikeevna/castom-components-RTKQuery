import { ChangeEvent, useState } from "react";
import styles from "@/components/ui/imageUplouder/styles.module.scss";
import { Button } from "@/components/ui/button";
import { getRotatedImage, readFile } from "@/helpers.ts";


export enum FileType {IMAGE = 'IMAGE', VIDEO = 'VIDEO'}
const ORIENTATION_TO_ANGLE = {'3': 180, '6': 90, '8': -90,}

const getFileFilter = function(type: FileType): string {
  switch ( type ) {
    case FileType.IMAGE:
      return 'image/*';
    case FileType.VIDEO:
      return 'video/*';
    default:
      return '';
  }
};
type propsType={
  buttonText:string
  fileType:FileType
  resetOnClick:boolean
  url:string|Blob
  fileSelected:(e: ChangeEvent<HTMLInputElement>)=>void
  className?:string
}
const FileUploader = (props:propsType) => {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = async(e:ChangeEvent<HTMLInputElement>) => {
    if( e.target.files && e.target.files.length > 0 ) {
      const file = e.target.files[0]
      console.log('FileUploader/file', file);


      // let imageDataUrl = await readFile(file)
      //
      // try {
      //   // !!!! apply rotation if needed
      //   // const orientation = await getOrientation(file)
      //   // const rotation = ORIENTATION_TO_ANGLE[orientation]
      //   // if( rotation ) {
      //   if( imageDataUrl ) {
      //     //!!! imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      //     imageDataUrl = await getRotatedImage(imageDataUrl, 0)
      //   }
      // } catch( e ) {
      //   console.warn('failed to detect the orientation')
      // }

      setFile(file)
      props.fileSelected(file)
      // setFile(imageDataUrl)
      // props.fileSelected(imageDataUrl)

    }
  }
  const click = (e: React.MouseEvent) => {
    if( props.resetOnClick ) {
      const target = e.target as HTMLInputElement;
      target.value = '';
      setFile(null);
    }
  };
  const textBtn = props.buttonText || 'Upload image';

  return (<div className={`${styles.root} ${props.className}`}>
    <div className={styles.uploadWrapper}>
      <input type="file" onClick={click} onChange={onFileChange} accept={getFileFilter(props.fileType)} name={props.name}/>
      <Button type="button" className={styles.uploadButton} fullWidth={true}>
        {file ? 'Change img' : textBtn}
      </Button>
    </div>
    {file && <span className={styles.selectedFileName}>{file.name}</span>}
  </div>);
};


export { FileUploader};
