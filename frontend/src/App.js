import { ChakraProvider } from "@chakra-ui/react";
import { THEME } from "./constants";
import "./App.css";
import SkillView from "./components/view/skillView";

function App() {
  return (
    <ChakraProvider>
      <div
        className="w-full h-screen color-white flex justify-center"
        style={{ backgroundColor: THEME[0] }}
      >
        <SkillView></SkillView>
      </div>
    </ChakraProvider>
  );
}

export default App;
