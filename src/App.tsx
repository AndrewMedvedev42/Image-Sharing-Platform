import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./modules/componets/navigation-menu";
import { HomePage } from "./modules/home";
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
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginInPage/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="/users/:username" element={<UserProfilePage/>}></Route>
        <Route path="/users/:username/submit-image" element={<SubmitImagePage/>}></Route>
        <Route path="/images/:id" element={<ImagePreviewPage/>}></Route>
      </Routes>
  </Router>
  );
}

export default App;
