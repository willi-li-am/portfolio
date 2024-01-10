import { Input, Flex } from "@chakra-ui/react";
import ImageInput from "../inputs/imageInput";
import GeneralModal from "./generalModal";
import SelectInput from "../inputs/selectInput";
import { ENDPOINTS, SKILL_TYPES, THEME } from "../../constants";
import { useForm } from "react-hook-form";
import { axiosPreset } from "../../axiosConfig";
import { useState } from "react";

const CRUD_HEADER = {
  edit: "Edit Skill",
  create: "Add New Skill",
  delete: "Deleting Skill",
};

const createSkill = async (data) => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;
  const formData = new FormData();
  formData.append("file", data.file[0]);
  formData.append("name", data.name);
  formData.append("type", data.type);

  await axiosPreset
    .post(baseURL + ENDPOINTS.SKILL, formData)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};

const editSkill = async (data, skill) => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  console.log(data);

  if (
    data.file.length === 0 &&
    data.name === skill.name &&
    data.type === skill.type
  ) {
    return console.log("no edits made");
  }

  const formData = new FormData();
  if (data.file.length > 0) {
    formData.append("file", data.file[0]);
  }

  if (data.name !== skill.name) {
    formData.append("newName", data.name);
  }

  if (skill.type !== data.type) {
    formData.append("type", data.type);
  }

  formData.append("oldName", skill.name);

  await axiosPreset
    .patch(baseURL + ENDPOINTS.SKILL, formData)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};

const deleteSkill = async (skill) => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  await axiosPreset
    .delete(baseURL + ENDPOINTS.SKILL + "/" + skill.name)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const CreateInput = ({ register }) => {
  return (
    <Flex justifyContent="space-evenly" alignItems="center">
      <ImageInput register={register}></ImageInput>
      <Flex direction="column" gap="5">
        <Input
          autoComplete="off"
          {...register("name")}
          borderWidth="3px"
          focusBorderColor={THEME[2]}
          borderColor={THEME[0]}
          width="200x"
          placeholder="ex: React.js"
          type="text"
        ></Input>
        <SelectInput
          registerType={"type"}
          register={register}
          width="170px"
          placeholder="Select Type"
          options={SKILL_TYPES}
        />
      </Flex>
    </Flex>
  );
};

const EditInput = ({ skill, register }) => {
  return (
    <Flex justifyContent="space-evenly" alignItems="center">
      <ImageInput register={register} editImage={skill.icon}></ImageInput>
      <Flex direction="column" gap="5">
        <Input
          autoComplete="off"
          {...register("name")}
          borderWidth="3px"
          focusBorderColor={THEME[2]}
          borderColor={THEME[0]}
          width="200x"
          placeholder="ex: React.js"
          type="text"
          defaultValue={skill.name}
        ></Input>
        <SelectInput
          registerType={"type"}
          register={register}
          width="170px"
          placeholder="Select Type"
          options={SKILL_TYPES}
          defaultType={skill.type}
        />
      </Flex>
    </Flex>
  );
};

const DeleteInput = ({ skill }) => {
  return (
    <>
      <div>
        You are about to delete <b>{skill.name}</b> permanently
      </div>
      <div>Are you sure about this?</div>
    </>
  );
};

const handleSubmitType = async (
  type,
  data,
  skill,
  setIsLoading,
  onClose,
  reset,
) => {
  setIsLoading(true);
  try {
    switch (type) {
      case "edit":
        await editSkill(data, skill);
        break;
      case "create":
        await createSkill(data);
        break;
      case "delete":
        await deleteSkill(skill);
        break;
      default:
        break;
    }
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
    onClose();
    reset();
  }
};

const SkillModal = ({ isOpen, onOpen, onClose, type, skill }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const header = CRUD_HEADER[type];

  return (
    <>
      <GeneralModal
        reset={reset}
        onClose={() => {
          onClose();
          reset();
        }}
        isOpen={isOpen}
        header={header}
        onSubmit={handleSubmit((data) =>
          handleSubmitType(type, data, skill, setIsLoading, onClose, reset),
        )}
        isLoading={isLoading}
      >
        {(() => {
          switch (type) {
            case "edit":
              return <EditInput register={register} skill={skill} />;
            case "create":
              return <CreateInput register={register} />;
            case "delete":
              return <DeleteInput skill={skill} />;
            default:
              return <div>{type} is not a valid type</div>;
          }
        })()}
      </GeneralModal>
    </>
  );
};

export default SkillModal;
