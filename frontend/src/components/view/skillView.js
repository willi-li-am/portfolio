import { useState, useEffect } from "react";
import { axiosPreset } from "../../axiosConfig";
import { ENDPOINTS, THEME } from "../../constants";
import AddButton from "../buttons/addButton";
import SkillModal from "../modals/skillModal";
import { useDisclosure, Spinner } from "@chakra-ui/react";
import SkillIcon from "../icons/skillIcon";

const SkillView = () => {
  const [skills, setSkills] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const baseURL = process.env.REACT_APP_BACKEND_URL;
      axiosPreset
        .get(baseURL + ENDPOINTS.SKILL)
        .then((res) => setSkills(res.data));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  return (
    <div className="h-[240px] w-auto">
      <div className="text-white font-bold text-[30px]">Skills</div>
      <div className="w-[90vw] h-[200px] border-[#424769] border-[5px] rounded-xl overflow-x-auto overflow-y-hidden flex flex-row items-center gap-5 p-5">
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Spinner
              color="white"
              size="xl"
              thickness="4px"
              emptyColor={THEME[1]}
            ></Spinner>
          </div>
        ) : (
          <>
            {skills &&
              skills.map((skill) => {
                return <SkillIcon skill={skill} text={true} />;
              })}
            <AddButton onClick={onOpen}></AddButton>
            <SkillModal
              refresh={refresh}
              setRefresh={setRefresh}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              type="create"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SkillView;
