import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { Image } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const ImageInput = ({ register, editImage }) => {
  const [image, setImage] = useState();

  const handleClick = () => {
    document.getElementById("hiddenFileInput").click();
  };

  const handleNewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setImage(imageUrl);
    }
    register("file").onChange(event);
  };

  const EditImage = ({ image }) => {
    const [hover, setHover] = useState(false);
    return (
      <div
        className="relative"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <Image
          src={image}
          className="rounded-[9px] w-fit h-fit object-cover aspect-square"
        />
        {hover && (
          <div className="absolute w-full h-full bg-black top-0 rounded-[9px] opacity-60"></div>
        )}
        {hover && (
          <EditIcon className="absolute w-[30px] h-[30px] top-0 left-0 right-0 bottom-0 m-auto"></EditIcon>
        )}
      </div>
    );
  };

  return (
    <div className="w-[80px] h-[80px]">
      <div
        onClick={handleClick}
        className="w-[80px] h-[80px] border-[3px] border-[#2D3250] transition hover:bg-[#2D3250] rounded-xl hover:cursor-pointer flex items-center justify-center"
      >
        {image || editImage ? (
          <EditImage image={image ? image : editImage} />
        ) : (
          <AiOutlineUpload className="w-[30px] h-[30px]" color="white" />
        )}
      </div>
      <input
        {...register("file")}
        id="hiddenFileInput"
        className="hidden"
        type="file"
        onChange={handleNewImage}
      />
    </div>
  );
};

export default ImageInput;
