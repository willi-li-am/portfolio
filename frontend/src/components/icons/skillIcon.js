import { useRef, useState } from "react";
import SkillModal from "../modals/skillModal";
import { useDisclosure } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const SkillIcon = ({ text, skill }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [hover, setHover] = useState(false);
  const [type, setType] = useState("");

  const onEdit = () => {
    setType("edit");
    onOpen();
  };

  const onDelete = () => {
    setType("delete");
    onOpen();
  };

  const parentRef = useRef(null);
  return (
    <div
      className="flex flex-col relative hover:cursor-pointer"
      ref={parentRef}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <img
        onClick={onEdit}
        className="mb-[20px] min-w-[100px] max-w-[100px] max-h-[100px] min-h-[100px] object-cover aspect-square"
        src={skill.icon}
      ></img>
      {hover && (
        <div
          onClick={onEdit}
          className="absolute w-full h-[100px] bg-black top-0 opacity-60"
        ></div>
      )}
      {hover && (
        <div onClick={onEdit} className="absolute w-full h-[100px]">
          <EditIcon
            color={"white"}
            boxSize={5}
            className="absolute top-0 left-0 right-0 bottom-0 m-auto"
          ></EditIcon>
        </div>
      )}
      {hover && (
        <div
          onClick={onDelete}
          className="absolute w-[40px] h-[40px] rounded-full right-0 mt-[-15px] mr-[-15px]"
        >
          <div className="flex items-center justify-center w-full h-full">
            <DeleteIcon boxSize={6} color={"red"} />
          </div>
        </div>
      )}
      {text && (
        <div
          onClick={onEdit}
          className="absolute text-[12px] font-bold text-center text-white w-[100px] mt-[100px]"
        >
          {skill.name}
        </div>
      )}
      {isOpen && (
        <SkillModal
          type={type}
          skill={skill}
          onOpen={onEdit}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default SkillIcon;
