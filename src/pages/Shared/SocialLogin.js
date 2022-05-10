import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import google from "../../img/PinClipart.com_google-clip-art-free_5300214.png";
import Loading from "./Loading/Loading";

const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleSignInWithGoogle = () => {
    signInWithGoogle();
  };
  const navigate = useNavigate();
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }

  const from = location.state?.from?.pathname || "/";

  if (user) {
    navigate(from, { replace: true });
  }

  let errorElement;
  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }
  return (
    <div className="container">
      {errorElement}
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="bg-warning w-50 "></div>
        <p className="mt-2 px-2">or</p>
        <div style={{ height: "1px" }} className="bg-warning w-50 "></div>
      </div>

      <div>
        <button
          onClick={handleSignInWithGoogle}
          className="my-2 btn bg-black text-warning border border-warning w-50 d-flex justify-content-center mx-auto align-items-center mb-5"
        >
          <img style={{ width: "30px", height: "30px" }} src={google} alt="" />
          <span className="px-2">Google Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
