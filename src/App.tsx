import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NavigationBar } from "./componets/navigationMenu";

import { KvazarLandingPage } from "./pages/landing";
import { MainPage } from "./pages/main";
import { LoginInPage } from "./pages/login";
import { SignUpPage } from "./pages/signUp";
import { UserProfilePage } from "./pages/userProfile";
import { SubmitImagePage } from "./pages/submitImage";
import { ImagePreviewPage } from "./pages/imagePreview";
import { SuccesssfullUploadPage } from "./pages/successfullUpload";

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
