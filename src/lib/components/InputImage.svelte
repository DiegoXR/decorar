<script>
  import { currentSelectedImageStore } from "../CurrentSelectedImageStore.js";
  import { getSupportedSizes } from "../FrameSizesDataSet.js";
  import { goto } from "$app/navigation";


  const MaximumPixelSizeAllowed = 12 * 1024 * 1024; // 12 MP

  const ImageObject = {
        author: "",
        src: "",
        alt: "",
        description: "",
        availableSizes: [
          [0, 0],
        ],
        defaultSize: [0, 0],
      };

  /**
   * @param {Event} event - The list of files selected by the user.
   */
  function handleFileChange(event) {
    // @ts-ignore
    const file = event.target.files[0];
    if (file != null) {
      
      // Validate file signature to ensure only desired files are accepted even if they have the good extension  
      validateFile(file);
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = function () {
        const pxWidth = img.width;
        const pxHeight = img.height;

        // Validate maximum pixel size allowed    
        if (pxWidth * pxHeight > MaximumPixelSizeAllowed) {
          alert(
            "The uploaded image exceeds the maximum allowed resolution of 12MP."
          );
          URL.revokeObjectURL(img.src);
        } else {
          // Proceed with the image processing
          // console.log('Image is within the allowed resolution.');
          // console.log(`Selected file: ${file.name}`);
          
          updateStore(img);
        }
      };
    }

    /**
     * @param {any} file
     */
    async function validateFile(file) {
      const pngSignature = "89504e47";
      const jpegSignature = "ffd8ff";
      const webpSignature = "52494646";

      try {
        const signature = await getFileSignature(file, 8);
        if (
          signature.startsWith(pngSignature) ||
          signature.startsWith(jpegSignature) ||
          signature.startsWith(webpSignature)
        ) {
          console.log(`File is valid, its signature is ${signature}`);
        } else {
          console.error("Invalid file type");
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }

    /**
     * @param {any} file
     */
    function getFileSignature(file, length = 4) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            if (reader.result instanceof ArrayBuffer) {
              const bytes = new Uint8Array(reader.result).subarray(0, length);
              let header = "";
              for (let i = 0; i < bytes.length; i++) {
                header += bytes[i].toString(16);
              }
              resolve(header);
            } else {
              reject("No file data found or not an ArrayBuffer");
            }
          } else {
            reject("No file data found");
          }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file.slice(0, length));
      });
    }

    /**
     * @param {HTMLImageElement} image
     */
    function updateStore(image) {
      
      ImageObject.src = image.src;
      ImageObject.availableSizes = getSupportedSizes(image.width / image.height);
      ImageObject.defaultSize = ImageObject.availableSizes[0];

      currentSelectedImageStore.set(ImageObject);
      goto("/MainNavigation/Setup");
    }

    /**
     * @param {number} pxWidth
     * @param {number} pxHeight
     */
    function calculateAvailableSizes(pxWidth, pxHeight){
      // Verify if the if the image  current ratio is available in the dataset so we can retreive the dataset sizes
      const imageRatio = pxWidth/pxHeight;
      getSupportedSizes(imageRatio);
    }
  }
</script>

<div class="bg-white w-full flex flex-row items-center justify-center">
  <label
    for="input-file"
    class="text-white font-poppins font-regular text-xs py-2 px-4 rounded-full bg-black ml-auto mr-auto"
    >Upload your Image</label
  >
  <input
    type="file"
    accept=".PNG,.JPEG,.JPG,.WEBP"
    id="input-file"
    class="hidden"
    on:change={handleFileChange}
  />

  <!-- <h1 class="text-black font-poppins font-regular text-sm">Upload your image</h1>
  <h1 class="text-black font-poppins font-regular text-xs">Upload your image</h1>
  <h1 class="text-black font-poppins font-medium text-sm">Upload your image</h1> -->
</div>
