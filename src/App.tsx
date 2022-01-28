import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NavigationBar } from "./modules/componets/navigation-menu";

import { MainPage } from "./modules/main page/main";
import { LoginInPage } from "./modules/login";
import { SignUpPage } from "./modules/signup";
import { UserProfilePage } from "./modules/user-profile";
import { SubmitImagePage } from "./modules/submit-image";
import { ImagePreviewPage } from "./modules/image-preview";

function App() {
  return (
    <Router>
    <NavigationBar/>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/login" element={<LoginInPage/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="/users/:id" element={<UserProfilePage/>}></Route>
        <Route path="/users/:id/submit-image" element={<SubmitImagePage/>}></Route>
        <Route path="/images/:username/:id" element={<ImagePreviewPage/>}></Route>
      </Routes>
  </Router>
  );
}

export default App;
