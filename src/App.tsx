import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NavigationBar } from "./modules/componets/navigation-menu";

import { KvazarLandingPage } from "./modules/pages/landing_page";
import { MainPage } from "./modules/main_page/main";
import { LoginInPage } from "./modules/pages/login";
import { SignUpPage } from "./modules/pages/signup";
import { UserProfilePage } from "./modules/pages/user-profile";
import { SubmitImagePage } from "./modules/pages/submit-image";
import { ImagePreviewPage } from "./modules/pages/image-preview";
import { SuccesssfullUploadPage } from "./modules/pages/successfull-upload-page";

function App() {
  return (
    <Router>
    <NavigationBar/>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/about" element={<KvazarLandingPage/>}></Route>
        <Route path="/login" element={<LoginInPage/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="/users/:id" element={<UserProfilePage/>}></Route>
        <Route path="/users/:id/submit-image" element={<SubmitImagePage/>}></Route>
        <Route path="/images/:username/:id" element={<ImagePreviewPage/>}></Route>
        <Route path="/success" element={<SuccesssfullUploadPage/>}></Route>
      </Routes>
  </Router>
  );
}

export default App;
