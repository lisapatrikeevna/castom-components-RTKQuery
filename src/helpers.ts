type pixelCropType={
  height:number
  width:number
  x:number
  y:number
}


// export const createImage = (url:string) =>
//
//   new Promise((resolve, reject) => {
//     const image = new Image()
//     image.addEventListener('load', () => resolve(image))
//     image.addEventListener('error', (error) => reject(error))
//     image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
//     image.src = url
//   })

export const createImage = (url: string) => {
  if (url.startsWith('blob')) {
    // Если URL начинается с 'blob', считаем его URL-адресом 'blob'
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });
  } else {
    // В противном случае, считаем URL-адресом бинарного файла на Amazon S3
    return fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const imageUrl = URL.createObjectURL(blob);
      const image = new Image();
      image.src = imageUrl;
      return new Promise((resolve, reject) => {
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
      });
    });
  }
};
export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width:number, height:number, rotation) {
  const rotRad = getRadianAngle(rotation)

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */

export default async function getCroppedImg(imageSrc:string, pixelCrop:pixelCropType, rotation = 0, flip = { horizontal: false, vertical: false }): Promise<File> {
  // https://andrii-flashcards.s3.eu-central-1.amazonaws.com/99e601b1-cc57-4b46-9f55-1a771d98002c-blob -с сервака
  // blob:http://localhost:5173/30004f7d-f03a-4f99-ace2-df82003c7b01 -при загрузке
  console.log('imageSrc', imageSrc)//с сервака string, при загрузке string
  console.log('pixelCrop', pixelCrop)//с сервака {height:79, width:79, x:26, y:20}, при загрузке {height:429, width:429, x:79, y:8}
  console.log('pixelCrop', typeof pixelCrop)//с сервака obg,при загрузке{}
  const image = await createImage(imageSrc)
  console.log("image", image);
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  console.log('canvas', canvas);
  console.log('ctx', ctx);
  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  // draw rotated image
  ctx.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')

  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    return null
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // As Base64 string
  // return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((blob) => {
      if(!blob){
        console.log('there is no file!')
      }else{

        resolve(blob);
      }

    }, 'image/jpeg')
  })
}
