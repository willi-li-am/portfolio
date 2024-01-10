import { AddIcon } from "@chakra-ui/icons";

const AddButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="min-w-[80px] min-h-[80px] bg-[#424769] transition hover:bg-[#7077A1] rounded-xl hover:cursor-pointer flex items-center justify-center"
    >
      <AddIcon color={"black"} boxSize={30}></AddIcon>
    </div>
  );
};

export default AddButton;
