import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NavigationBar } from "./componets/navigation-menu";

import { KvazarLandingPage } from "./pages/landing_page";
import { MainPage } from "./pages/main";
import { LoginInPage } from "./pages/login";
import { SignUpPage } from "./pages/signup";
import { UserProfilePage } from "./pages/user-profile";
import { SubmitImagePage } from "./pages/submit-image";
import { ImagePreviewPage } from "./pages/image-preview";
import { SuccesssfullUploadPage } from "./pages/successfull-upload-page";

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
